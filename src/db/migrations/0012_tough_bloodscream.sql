ALTER TABLE "admins" RENAME COLUMN "uder_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "admins" DROP CONSTRAINT "admins_uder_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "admins" ADD CONSTRAINT "admins_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;