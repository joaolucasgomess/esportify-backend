ALTER TABLE "avaliable_slots" RENAME TO "availableSlots";--> statement-breakpoint
ALTER TABLE "availableSlots" DROP CONSTRAINT "avaliable_slots_court_id_courts_id_fk";
--> statement-breakpoint
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_slot_id_avaliable_slots_id_fk";
--> statement-breakpoint
ALTER TABLE "availableSlots" ADD CONSTRAINT "availableSlots_court_id_courts_id_fk" FOREIGN KEY ("court_id") REFERENCES "public"."courts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_slot_id_availableSlots_id_fk" FOREIGN KEY ("slot_id") REFERENCES "public"."availableSlots"("id") ON DELETE no action ON UPDATE no action;