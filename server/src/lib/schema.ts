import type { Generated, Selectable } from "kysely"

// Kysely table types. Keep them in step with migrations/*.sql by hand: one
// interface per table, `Generated<>` for columns that have a database default.

export interface UsersTable {
	id: Generated<string>
	name: string
	email: string
	created_at: Generated<Date>
}

export type UserRow = Selectable<UsersTable>

export interface Database {
	users: UsersTable
}
