import { verifyFieldsToObject } from "../utils/VerifyFieldsToObject";
import { CustomError } from "../utils/CustomError";
import { generatedId } from "../utils/idGenerator";
import { AvailableSlot, NewAvailableSlot } from "../db/schema";
import { ISlotsRepository } from "../repositories/interfaces/slots.repository.interface";
import { ICourtRepository } from "../repositories/interfaces/court.repository.interface";

export class SlotsService {
    private slotsRepository: ISlotsRepository;
    private courtRepository: ICourtRepository;

    constructor(slotsRepository: ISlotsRepository, courtRepository: ICourtRepository) {
        this.slotsRepository = slotsRepository;
        this.courtRepository = courtRepository;
    }

    addAvailableSlot = async (
        newSlot: Omit<NewAvailableSlot, "id">,
        sportsComplexId: string,
    ): Promise<void> => {
        try {
            if (verifyFieldsToObject(newSlot) === false) {
                throw new CustomError("Campos inválidos", 422);
            }

            if (newSlot.price <= 0) {
                throw new CustomError("O preço informado é menor ou igual a zero", 422);
            }

            const startDateConverted = new Date(newSlot.startDate);

            if (startDateConverted < new Date()) {
                throw new CustomError(
                    "A data de inicio nao pode ser menor que a data atual.",
                    422,
                );
            }

            if (![1, 2, 3, 4, 5, 6, 7].includes(newSlot.dayOfWeek)) {
                throw new CustomError("Dia da semana não encontrado", 404);
            }

            const court = await this.courtRepository.selectCourtById(newSlot.courtId);

            if (!court) {
                throw new CustomError("Quadra não encontrada", 404);
            }

            if (court.sportsComplexId !== sportsComplexId) {
                throw new CustomError(
                    "Complexo esportivo informado difere do logado",
                    403,
                );
            }

            const conflictedSlot = await this.slotsRepository.findCoflictedSlots({
                startTime: newSlot.startTime,
                endTime: newSlot.endTime,
                startDate: newSlot.startDate,
                endDate: newSlot.endDate,
                dayOfWeek: newSlot.dayOfWeek,
                courtId: newSlot.courtId,
            });

            if (conflictedSlot) {
                throw new CustomError(
                    `Já existe um horário iniciando em  no dia selecionado`,
                    422,
                );
            }

            const id = generatedId();
            await this.slotsRepository.insertAvailableSlot({
                id,
                startTime: newSlot.startTime,
                endTime: newSlot.endTime,
                startDate: newSlot.startDate,
                endDate: newSlot.endDate,
                price: newSlot.price,
                dayOfWeek: newSlot.dayOfWeek,
                courtId: newSlot.courtId,
            });
        } catch (err: any) {
            throw new CustomError(err.message, err.statusCode);
        }
    };

    deleteSlot = async (slotId: string, sportsComplex: string): Promise<void> => {
        try {
            if (!slotId) {
                throw new CustomError("É preciso informar um id", 422);
            }

            const slotToDelete = await this.slotsRepository.selectSlotById(slotId);

            if (!slotToDelete) {
                throw new CustomError("Horário não encontrado", 404);
            }

            const court = await this.courtRepository.selectCourtById(
                slotToDelete.courtId,
            );

            if (sportsComplex !== court.id) {
                throw new CustomError("Usuário sem permissão para essa operação", 403);
            }

            slotToDelete.deleted = new Date();

            await this.slotsRepository.updateSlot(slotId, slotToDelete);
        } catch (err: any) {
            throw new CustomError(err.message, err.statusCode);
        }
    };

    alterSlotStatus = async (slotId: string): Promise<void> => {
        try {
            if (!slotId) {
                throw new CustomError("É preciso informar um id", 422);
            }

            const slot = await this.slotsRepository.selectSlotById(slotId);

            if (!slot) {
                throw new CustomError("Nenhum horário encontrado", 404);
            }

            //TODO: criar um metodo pra validar a conexão do horario, quadra e complexo esportivo

            await this.slotsRepository.updateSlot(slotId, slot);
        } catch (err: any) {
            throw new CustomError(err.message, err.statusCode);
        }
    };

    getSlotsByCourtId = async (courtId: string): Promise<AvailableSlot[]> => {
        try {
            if (!courtId) {
                throw new CustomError("Campos inválidos", 422);
            }

            const slotsByIdCourt =
                await this.slotsRepository.selectSlotsByIdCourt(courtId);

            if (slotsByIdCourt.length === 0) {
                throw new CustomError("Quadra não possui horários cadastrados", 404);
            }

            return slotsByIdCourt;
        } catch (err: any) {
            throw new CustomError(err.message, err.statusCode);
        }
    };
}
