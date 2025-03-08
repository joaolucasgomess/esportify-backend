import { relations } from "drizzle-orm";
import { pgTable, varchar, timestamp, date, integer, boolean, time, decimal, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey(),
  email: varchar().notNull().unique(),
  password: varchar().notNull(),
  name: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull()
});

export const clientsTable = pgTable("clients", {
  id: uuid().primaryKey(),
  phone: varchar({ length: 12 }).notNull(),
  birthday: date().notNull(),
  userId: uuid("uder_id").references(() => usersTable.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull()
});

export const adminsTable = pgTable("admins", {
  id: uuid().primaryKey(),
  userId: uuid("uder_id").references(() => usersTable.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull()
});

export const addressTable = pgTable("address", {
  id: uuid().primaryKey(),
  street: varchar().notNull(),
  neighborhood: varchar().notNull(),
  city: varchar().notNull(),
  complement: varchar(),
  number: integer().notNull(),
  zipCode: varchar({ length: 8 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull()
});

export const sportsComplexTable = pgTable("sports_complex", {
  id: uuid().primaryKey(),
  name: varchar().notNull(),
  cnpj: varchar({ length: 15 }).notNull().unique(),
  addressId: uuid().references(() => addressTable.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull()
});

export const courtsTable = pgTable("courts", {
  id: uuid().primaryKey(),
  name: varchar().notNull(),
  active: boolean().notNull().default(true),
  imageUrl: varchar("image_url"),
  sportsComplexId: uuid("sports_complex_id").references(() => sportsComplexTable.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull()
});

export const availableSlotsTable = pgTable("avaliable_slots", {
  id: uuid().primaryKey(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  startDate: date("start_date"),
  endDate: date("end_date"),
  price: decimal().notNull(),
  dayOfWeek: integer("day_of_week").notNull(),
  active: boolean().notNull().default(true),
  deleted: timestamp().default(null),
  courtId: uuid("court_id").references(() => courtsTable.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull()
});

export const bookingsTable = pgTable("bookings", {
  id: uuid().primaryKey(),
  userId: uuid("user_id").references(() => usersTable.id).notNull(),
  slotId: uuid("slot_id").references(() => availableSlotsTable.id).notNull(),
  bookedDate: date("booked_date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull()
});

export const cnpjValidTable = pgTable("cnpj_valid", {
  id: uuid().primaryKey(),
  cnpj: varchar({ length: 15 }).notNull().unique(),
  active: boolean().notNull().default(true),
  registered: boolean().notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull()
});

export const usersRelations = relations(usersTable, ({ one }) => ({ 
  clientsTables: one(clientsTable),
  adminsTable: one(adminsTable),
  bookingsTable: one(bookingsTable)
}));

export const sportsComplexRelations = relations(sportsComplexTable, ({ one }) => ({ 
  addressTable: one(addressTable),
  courtsTable: one(courtsTable)
}));

export const courtsRelations = relations(courtsTable, ({ one }) => ({ 
  availableSlotsTable: one(availableSlotsTable),
}));

export const availableSlotsRelations = relations(availableSlotsTable, ({ one }) => ({
  bookingsTable: one(bookingsTable)
}));