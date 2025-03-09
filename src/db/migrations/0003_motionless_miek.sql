ALTER TABLE "clients" DROP CONSTRAINT "clients_sports_complex_id_sports_complex_id_fk";
--> statement-breakpoint
ALTER TABLE "admins" ADD COLUMN "sports_complex_id" uuid;--> statement-breakpoint
ALTER TABLE "admins" ADD CONSTRAINT "admins_sports_complex_id_sports_complex_id_fk" FOREIGN KEY ("sports_complex_id") REFERENCES "public"."sports_complex"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clients" DROP COLUMN "sports_complex_id";