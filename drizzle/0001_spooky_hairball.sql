CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text,
	`phone` text,
	`status` text DEFAULT 'new' NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`assigned_to` text,
	`source` text NOT NULL,
	`page_url` text,
	`referrer` text,
	`fields_json` text NOT NULL,
	`ip_hash` text,
	`user_agent` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`assigned_to`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `leads_id_unique` ON `leads` (`id`);--> statement-breakpoint
ALTER TABLE `users` ADD `role` text DEFAULT 'admin' NOT NULL;