CREATE TABLE "address" (
	"id" uuid PRIMARY KEY NOT NULL,
	"street" varchar NOT NULL,
	"neighborhood" varchar NOT NULL,
	"city" varchar NOT NULL,
	"complement" varchar,
	"number" integer NOT NULL,
	"zipCode" varchar(8) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "admins" (
	"id" uuid PRIMARY KEY NOT NULL,
	"uder_id" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "avaliable_slots" (
	"id" uuid PRIMARY KEY NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	"start_date" date,
	"end_date" date,
	"price" numeric NOT NULL,
	"day_of_week" integer NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"deleted" timestamp DEFAULT null,
	"court_id" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"slot_id" uuid NOT NULL,
	"booked_date" date NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "clients" (
	"id" uuid PRIMARY KEY NOT NULL,
	"phone" varchar(12) NOT NULL,
	"birthday" date NOT NULL,
	"uder_id" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cnpj_valid" (
	"id" uuid PRIMARY KEY NOT NULL,
	"cnpj" varchar(14) NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"registered" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "cnpj_valid_cnpj_unique" UNIQUE("cnpj")
);
--> statement-breakpoint
CREATE TABLE "courts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"image_url" varchar,
	"sports_complex_id" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sports_complex" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"cnpj" varchar(14) NOT NULL,
	"addressId" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sports_complex_cnpj_unique" UNIQUE("cnpj")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "admins" ADD CONSTRAINT "admins_uder_id_users_id_fk" FOREIGN KEY ("uder_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "avaliable_slots" ADD CONSTRAINT "avaliable_slots_court_id_courts_id_fk" FOREIGN KEY ("court_id") REFERENCES "public"."courts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_slot_id_avaliable_slots_id_fk" FOREIGN KEY ("slot_id") REFERENCES "public"."avaliable_slots"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_uder_id_users_id_fk" FOREIGN KEY ("uder_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courts" ADD CONSTRAINT "courts_sports_complex_id_sports_complex_id_fk" FOREIGN KEY ("sports_complex_id") REFERENCES "public"."sports_complex"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sports_complex" ADD CONSTRAINT "sports_complex_addressId_address_id_fk" FOREIGN KEY ("addressId") REFERENCES "public"."address"("id") ON DELETE no action ON UPDATE no action;