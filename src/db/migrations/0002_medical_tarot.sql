ALTER TABLE "address" ADD COLUMN "state" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "sports_complex_id" uuid;--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_sports_complex_id_sports_complex_id_fk" FOREIGN KEY ("sports_complex_id") REFERENCES "public"."sports_complex"("id") ON DELETE no action ON UPDATE no action;