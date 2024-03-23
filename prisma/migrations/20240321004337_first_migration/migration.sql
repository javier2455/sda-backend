-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "visibility" TEXT NOT NULL,
    "body" TEXT,

    CONSTRAINT "api_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_headers" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "headersApiId" INTEGER NOT NULL,

    CONSTRAINT "api_headers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_params" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dataType" TEXT NOT NULL,
    "example" TEXT NOT NULL,
    "inOrOut" TEXT NOT NULL,
    "paramsApiId" INTEGER NOT NULL,

    CONSTRAINT "api_params_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_entity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "entityApiId" INTEGER NOT NULL,

    CONSTRAINT "api_entity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "api_headers" ADD CONSTRAINT "api_headers_headersApiId_fkey" FOREIGN KEY ("headersApiId") REFERENCES "api"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api_params" ADD CONSTRAINT "api_params_paramsApiId_fkey" FOREIGN KEY ("paramsApiId") REFERENCES "api"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api_entity" ADD CONSTRAINT "api_entity_entityApiId_fkey" FOREIGN KEY ("entityApiId") REFERENCES "api"("id") ON DELETE CASCADE ON UPDATE CASCADE;
