ALTER TABLE "sports_complex" RENAME COLUMN "addressId" TO "address_id";--> statement-breakpoint
ALTER TABLE "sports_complex" DROP CONSTRAINT "sports_complex_addressId_address_id_fk";
--> statement-breakpoint
ALTER TABLE "sports_complex" ADD CONSTRAINT "sports_complex_address_id_address_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."address"("id") ON DELETE no action ON UPDATE no action;