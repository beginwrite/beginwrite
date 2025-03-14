CREATE TABLE `post` (
	`id` int AUTO_INCREMENT NOT NULL,
	`uuid` varchar(1024) NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`user_id` int NOT NULL,
	`published_at` varchar(255),
	`created_at` varchar(255) NOT NULL,
	`updated_at` varchar(255),
	`deleted_at` varchar(255),
	CONSTRAINT `post_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`uuid` varchar(1024) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`hash` varchar(255) NOT NULL,
	`access_token` varchar(1024),
	`display_name` varchar(255) NOT NULL,
	`bio` text,
	`avatar` varchar(1000),
	`created_at` varchar(255) NOT NULL,
	`updated_at` varchar(255) NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
