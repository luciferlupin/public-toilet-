-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "name" TEXT,
    "avatar" TEXT,
    "isGuest" BOOLEAN NOT NULL DEFAULT false,
    "trustScore" INTEGER NOT NULL DEFAULT 0,
    "points" INTEGER NOT NULL DEFAULT 0,
    "badge" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toilets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "address" TEXT,
    "area" TEXT,
    "city" TEXT NOT NULL DEFAULT 'Delhi',
    "state" TEXT NOT NULL DEFAULT 'Delhi',
    "pincode" TEXT,
    "isFree" BOOLEAN NOT NULL DEFAULT true,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "price" DOUBLE PRECISION,
    "isMale" BOOLEAN NOT NULL DEFAULT true,
    "isFemale" BOOLEAN NOT NULL DEFAULT true,
    "isUnisex" BOOLEAN NOT NULL DEFAULT false,
    "isWheelchairAccessible" BOOLEAN NOT NULL DEFAULT false,
    "hasBabyChangingStation" BOOLEAN NOT NULL DEFAULT false,
    "hasShower" BOOLEAN NOT NULL DEFAULT false,
    "isOpen24_7" BOOLEAN NOT NULL DEFAULT false,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "cleanlinessRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "safetyRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "overallRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currentCrowdLevel" INTEGER NOT NULL DEFAULT 0,
    "hasWater" BOOLEAN NOT NULL DEFAULT true,
    "hasTissue" BOOLEAN NOT NULL DEFAULT true,
    "smellLevel" INTEGER NOT NULL DEFAULT 0,
    "openingTime" TEXT,
    "closingTime" TEXT,
    "lastCleanedAt" TIMESTAMP(3),
    "cleaningFrequency" TEXT,
    "contactNumber" TEXT,
    "website" TEXT,
    "locationType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "toilets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "toiletId" TEXT NOT NULL,
    "cleanlinessRating" INTEGER NOT NULL,
    "safetyRating" INTEGER NOT NULL,
    "overallRating" INTEGER NOT NULL,
    "comment" TEXT,
    "crowdLevel" INTEGER,
    "waterAvailable" BOOLEAN,
    "tissueAvailable" BOOLEAN,
    "smellLevel" INTEGER,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "helpfulCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "toiletId" TEXT NOT NULL,
    "reportType" TEXT NOT NULL,
    "description" TEXT,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "adminResponse" TEXT,
    "resolvedAt" TIMESTAMP(3),
    "resolvedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image_uploads" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "toiletId" TEXT,
    "imageUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "aiCleanlinessScore" DOUBLE PRECISION,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "fileSize" INTEGER,
    "width" INTEGER,
    "height" INTEGER,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "image_uploads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "check_ins" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "toiletId" TEXT NOT NULL,
    "checkInTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkOutTime" TIMESTAMP(3),
    "duration" INTEGER,
    "quickRating" INTEGER,
    "quickFeedback" TEXT,
    "qrCodeData" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "check_ins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "badges" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "pointsRequired" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_badges" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "badgeId" TEXT NOT NULL,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_badges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "badges_name_key" ON "badges"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_badges_userId_badgeId_key" ON "user_badges"("userId", "badgeId");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_toiletId_fkey" FOREIGN KEY ("toiletId") REFERENCES "toilets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_toiletId_fkey" FOREIGN KEY ("toiletId") REFERENCES "toilets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_uploads" ADD CONSTRAINT "image_uploads_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_uploads" ADD CONSTRAINT "image_uploads_toiletId_fkey" FOREIGN KEY ("toiletId") REFERENCES "toilets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_toiletId_fkey" FOREIGN KEY ("toiletId") REFERENCES "toilets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
