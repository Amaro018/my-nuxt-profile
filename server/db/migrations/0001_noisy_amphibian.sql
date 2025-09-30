CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`category` text NOT NULL,
	`image` text NOT NULL,
	`link` text NOT NULL,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`live_demo` text,
	`github_link` text
);
