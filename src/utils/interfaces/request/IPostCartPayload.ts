// id        String   @id @default(uuid())
// quantity  Int      @db.UnsignedInt
// item      Item     @relation(fields: [itemId], references: [id], onDelete: Cascade, onUpdate: Cascade)
// itemId    String
// buyer     User     @relation(fields: [buyerId], references: [id], onDelete: Cascade, onUpdate: Cascade, name: "buyer")
// buyerId   String
// order     Order?   @relation(fields: [orderId], references: [id], onDelete: Cascade, onUpdate: Cascade)
// orderId   String?
// createdAt DateTime @default(now())
// updatedAt DateTime @default(now()) @updatedAt

export interface IPostCartPayload {
  readonly quantity: number;
  readonly itemId: string;
}
