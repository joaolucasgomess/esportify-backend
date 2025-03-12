ALTER TABLE "availableSlots" RENAME TO "available_slots";--> statement-breakpoint
ALTER TABLE "available_slots" DROP CONSTRAINT "availableSlots_court_id_courts_id_fk";
--> statement-breakpoint
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_slot_id_availableSlots_id_fk";
--> statement-breakpoint
ALTER TABLE "available_slots" ADD CONSTRAINT "available_slots_court_id_courts_id_fk" FOREIGN KEY ("court_id") REFERENCES "public"."courts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_slot_id_available_slots_id_fk" FOREIGN KEY ("slot_id") REFERENCES "public"."available_slots"("id") ON DELETE no action ON UPDATE no action;