-- AlterTable
CREATE SEQUENCE productimage_id_seq;
ALTER TABLE "ProductImage" ALTER COLUMN "id" SET DEFAULT nextval('productimage_id_seq');
ALTER SEQUENCE productimage_id_seq OWNED BY "ProductImage"."id";
