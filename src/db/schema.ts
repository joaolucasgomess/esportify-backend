import { relations } from "drizzle-orm";
import {
	pgTable,
	varchar,
	timestamp,
	date,
	integer,
	boolean,
	time,
	doublePrecision,
	uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: uuid().primaryKey(),
	email: varchar().notNull().unique(),
	password: varchar().notNull(),
	name: varchar({ length: 255 }).notNull(),
	role: varchar().notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const clients = pgTable("clients", {
	id: uuid().primaryKey(),
	phone: varchar({ length: 12 }).notNull(),
	birthday: date().notNull(),
	userId: uuid("uder_id").references(() => users.id),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const admins = pgTable("admins", {
	id: uuid().primaryKey(),
	userId: uuid("user_id")
		.references(() => users.id)
		.notNull(),
	sportsComplexId: uuid("sports_complex_id")
		.references(() => sportsComplexes.id)
		.notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const address = pgTable("address", {
	id: uuid().primaryKey(),
	street: varchar().notNull(),
	neighborhood: varchar().notNull(),
	city: varchar().notNull(),
	complement: varchar(),
	number: integer().notNull(),
	state: varchar().notNull(),
	zipCode: varchar("zip_code", { length: 8 }).notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const sportsComplexes = pgTable("sports_complex", {
	id: uuid().primaryKey(),
	name: varchar().notNull(),
	cnpj: varchar({ length: 15 }).notNull().unique(),
	addressId: uuid("address_id")
		.references(() => address.id)
		.notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const courts = pgTable("courts", {
	id: uuid().primaryKey(),
	name: varchar().notNull(),
	active: boolean().notNull().default(true),
	imageUrl: varchar("image_url"),
	sportsComplexId: uuid("sports_complex_id")
		.references(() => sportsComplexes.id)
		.notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const availableSlots = pgTable("available_slots", {
	id: uuid().primaryKey(),
	startTime: time("start_time").notNull(),
	endTime: time("end_time").notNull(),
	startDate: date("start_date").notNull(),
	endDate: date("end_date").notNull(),
	price: doublePrecision().notNull(),
	dayOfWeek: integer("day_of_week").notNull(),
	active: boolean().notNull().default(true),
	deleted: timestamp().default(null),
	courtId: uuid("court_id")
		.references(() => courts.id)
		.notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const bookings = pgTable("bookings", {
	id: uuid().primaryKey(),
	userId: uuid("user_id")
		.references(() => users.id)
		.notNull(),
	slotId: uuid("slot_id")
		.references(() => availableSlots.id)
		.notNull(),
	bookedDate: date("booked_date").notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const cnpjValid = pgTable("cnpj_valid", {
	id: uuid().primaryKey(),
	cnpj: varchar({ length: 15 }).notNull().unique(),
	active: boolean().notNull().default(true),
	registered: boolean().notNull().default(false),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const usersRelations = relations(users, ({ one }) => ({
	clientss: one(clients),
	admins: one(admins),
	bookings: one(bookings),
}));

export const sportsComplexRelations = relations(sportsComplexes, ({ one }) => ({
	address: one(address),
	courts: one(courts),
}));

export const addressRelations = relations(address, ({ one }) => ({
	sportsComplexes: one(sportsComplexes),
}));

export const courtsRelations = relations(courts, ({ one }) => ({
	availableSlots: one(availableSlots),
}));

export const availableSlotsRelations = relations(availableSlots, ({ one }) => ({
	bookings: one(bookings),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Client = typeof clients.$inferSelect;
export type NewClient = typeof clients.$inferInsert;

export type Admin = typeof admins.$inferSelect;
export type NewAdmin = typeof admins.$inferInsert;

export type Address = typeof address.$inferSelect;
export type NewAddress = typeof address.$inferInsert;

export type SportsComplex = typeof sportsComplexes.$inferSelect;
export type NewSportsComplex = typeof sportsComplexes.$inferInsert;

export type Court = typeof courts.$inferSelect;
export type NewCourt = typeof courts.$inferInsert;

export type AvailableSlot = typeof availableSlots.$inferSelect;
export type NewAvailableSlot = typeof availableSlots.$inferInsert;

export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;

export type CnpjValid = typeof cnpjValid.$inferSelect;
