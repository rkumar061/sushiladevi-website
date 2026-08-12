import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  role: text("role", { enum: ["admin", "admission_staff"] }).notNull().default("admin"),
  passwordHash: text("password_hash").notNull(),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  mustChangePassword: integer("must_change_password", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
  lastLoginAt: integer("last_login_at", { mode: "timestamp_ms" }),
}, (table) => [uniqueIndex("users_email_unique").on(table.email)]);

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  lastSeenAt: integer("last_seen_at", { mode: "timestamp_ms" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
}, (table) => [uniqueIndex("sessions_token_hash_unique").on(table.tokenHash)]);

export const loginAttempts = sqliteTable("login_attempts", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  ipAddress: text("ip_address").notNull(),
  succeeded: integer("succeeded", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});

export const leads = sqliteTable("leads", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  status: text("status", { enum: ["new", "contacted", "qualified", "admitted", "closed"] }).notNull().default("new"),
  notes: text("notes").notNull().default(""),
  assignedTo: text("assigned_to").references(() => users.id, { onDelete: "set null" }),
  source: text("source").notNull(),
  pageUrl: text("page_url"),
  referrer: text("referrer"),
  fieldsJson: text("fields_json").notNull(),
  ipHash: text("ip_hash"),
  userAgent: text("user_agent"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
}, (table) => [
  uniqueIndex("leads_id_unique").on(table.id),
]);

export const contentDocuments = sqliteTable("content_documents", {
  key: text("key").primaryKey(),
  draftJson: text("draft_json").notNull(),
  publishedJson: text("published_json").notNull(),
  draftVersion: integer("draft_version").notNull().default(1),
  publishedVersion: integer("published_version").notNull().default(1),
  draftUpdatedAt: integer("draft_updated_at", { mode: "timestamp_ms" }).notNull(),
  publishedAt: integer("published_at", { mode: "timestamp_ms" }).notNull(),
  updatedBy: text("updated_by").references(() => users.id, { onDelete: "set null" }),
  publishedBy: text("published_by").references(() => users.id, { onDelete: "set null" }),
});

export const contentRevisions = sqliteTable("content_revisions", {
  id: text("id").primaryKey(),
  documentKey: text("document_key").notNull().references(() => contentDocuments.key, { onDelete: "cascade" }),
  version: integer("version").notNull(),
  contentJson: text("content_json").notNull(),
  publishedBy: text("published_by").references(() => users.id, { onDelete: "set null" }),
  publishedAt: integer("published_at", { mode: "timestamp_ms" }).notNull(),
});

export const mediaAssets = sqliteTable("media_assets", {
  id: text("id").primaryKey(),
  originalName: text("original_name").notNull(),
  storedName: text("stored_name").notNull(),
  storagePath: text("storage_path").notNull(),
  publicUrl: text("public_url").notNull(),
  mimeType: text("mime_type").notNull(),
  size: integer("size").notNull(),
  width: integer("width"),
  height: integer("height"),
  altText: text("alt_text"),
  caption: text("caption"),
  checksum: text("checksum").notNull(),
  trashedAt: integer("trashed_at", { mode: "timestamp_ms" }),
  uploadedBy: text("uploaded_by").references(() => users.id, { onDelete: "set null" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
}, (table) => [uniqueIndex("media_storage_path_unique").on(table.storagePath)]);

export const auditLogs = sqliteTable("audit_logs", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id"),
  metadataJson: text("metadata_json"),
  ipAddress: text("ip_address"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});

export const cmsSchema = { users, leads, sessions, loginAttempts, contentDocuments, contentRevisions, mediaAssets, auditLogs };
