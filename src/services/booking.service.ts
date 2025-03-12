import { CustomError } from '../utils/CustomError';
import { verifyFieldsToObject } from '../utils/VerifyFieldsToObject';
import { Authenticator } from '../utils/Authenticator';
import { generatedId } from '../utils/idGenerator';
import { ISlotsRepository } from '../repositories/interfaces/slots.repository.interface';
import { IBookingRepository } from '../repositories/interfaces/booking.repository.interface';
import { Booking, NewBooking } from '../db/schema';

export class BookingService{
    private bookingRepository: IBookingRepository;
    private slotsRepository: ISlotsRepository;
    private authenticator: Authenticator;

    constructor(bookingRepository: IBookingRepository, slotsRepository: ISlotsRepository){
        this.bookingRepository = bookingRepository;
        this.slotsRepository = slotsRepository;
        this.authenticator = new Authenticator();
    }

    //TODO: descobrir como lidar com concorrencia e integrar metodo de pagamento
    addBooking = async(token: string, newBooking: Omit<NewBooking, "id" | "userId">): Promise<void> => {
        try{
            if(!token){
                throw new CustomError('Token inexistente', 442);
            }
    
            const tokenData = this.authenticator.getTokenData(token);
    
            if(!tokenData){
                throw new CustomError('Token inválido', 401);
            }

            if(verifyFieldsToObject(newBooking) === false){
                throw new CustomError('Campos inválidos', 422);
            }

            const slot = await this.slotsRepository.selectSlotById(newBooking.slotId);

            if(!slot){
                throw new CustomError('Horário não encontrado', 404);
            }

            const bookedDateConverted = new Date(newBooking.bookedDate);

            if(bookedDateConverted < new Date()){
                throw new CustomError('Data informada menor que a atual', 422);
            }

            const alreadyBooked = await this.bookingRepository.findAlreadyBooking(newBooking.slotId, newBooking.bookedDate);

            if(alreadyBooked){
                throw new CustomError("Horario ja alocado", 401);
            }

            const id = generatedId()
            await this.bookingRepository.inserBooking({
                id,
                userId: tokenData.id,
                slotId: newBooking.slotId,
                bookedDate: newBooking.bookedDate
            });

        }catch(err: any){
            throw new CustomError(err.message, err.statusCode);
        }
    }

    getBookingsByCourtId = async(token: string, courtId: string): Promise<Booking[]> => {
        try{
            if(!token){
                throw new CustomError('Token inexistente', 442);
              }
        
              const tokenData = this.authenticator.getTokenData(token);
        
              if(!tokenData){
                  throw new CustomError('Token inválido', 401);
              }
        
              if(!courtId){
                  throw new CustomError('Campos inválidos', 422);
              }
        
              const bookings = await this.bookingRepository.selectBookingsByIdCourt(courtId);
        
              if(!bookings){
                throw new CustomError('Alugueis não encontrados', 404);
              }
        
              return bookings;
        }catch(err: any){
            throw new CustomError(err.message, err.statusCode);
        }
      }
}