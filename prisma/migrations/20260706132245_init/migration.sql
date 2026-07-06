-- CreateTable
CREATE TABLE "invitations" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "event_name" TEXT NOT NULL,
    "event_date" TIMESTAMP(3) NOT NULL,
    "default_theme_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "themes" (
    "id" TEXT NOT NULL,
    "invitation_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "config" JSONB NOT NULL,

    CONSTRAINT "themes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guest_groups" (
    "id" TEXT NOT NULL,
    "invitation_id" TEXT NOT NULL,
    "theme_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "guest_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guests" (
    "id" TEXT NOT NULL,
    "invitation_id" TEXT NOT NULL,
    "guest_group_id" TEXT,
    "theme_id" TEXT,
    "name" TEXT NOT NULL,
    "unique_code" TEXT NOT NULL,
    "phone" TEXT,

    CONSTRAINT "guests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rsvps" (
    "id" TEXT NOT NULL,
    "guest_id" TEXT NOT NULL,
    "attending" BOOLEAN NOT NULL,
    "guest_count" INTEGER NOT NULL,

    CONSTRAINT "rsvps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wishes" (
    "id" TEXT NOT NULL,
    "guest_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "is_approved" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wishes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "guests_unique_code_key" ON "guests"("unique_code");

-- CreateIndex
CREATE UNIQUE INDEX "rsvps_guest_id_key" ON "rsvps"("guest_id");

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_default_theme_id_fkey" FOREIGN KEY ("default_theme_id") REFERENCES "themes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "themes" ADD CONSTRAINT "themes_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "invitations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guest_groups" ADD CONSTRAINT "guest_groups_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "invitations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guest_groups" ADD CONSTRAINT "guest_groups_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "themes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guests" ADD CONSTRAINT "guests_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "invitations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guests" ADD CONSTRAINT "guests_guest_group_id_fkey" FOREIGN KEY ("guest_group_id") REFERENCES "guest_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guests" ADD CONSTRAINT "guests_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "themes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rsvps" ADD CONSTRAINT "rsvps_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "guests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishes" ADD CONSTRAINT "wishes_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "guests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
