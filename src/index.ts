import { BuyerHandlerImpl } from "./api/buyer/handler/BuyerHandlerImpl";
import { BuyerRouterImpl } from "./api/buyer/router/BuyerRouterImpl";
import { CartHandlerImpl } from "./api/cart/handler/CartHandlerImpl";
import { CartRouterImpl } from "./api/cart/router/CartRouterImpl";
import { FileHandlerImpl } from "./api/file/handler/FileHandlerImpl";
import { FileRouterImpl } from "./api/file/router/FileRouterImpl";
import { ItemHandlerImpl } from "./api/item/handler/ItemHandlerImpl";
import { ItemRouterImpl } from "./api/item/router/ItemRouterImpl";
import { OrderHandlerImpl } from "./api/order/handler/OrderHandlerImpl";
import { OrderRouterImpl } from "./api/order/router/OrderRouterImpl";
import { SellerHandlerImpl } from "./api/seller/handler/SellerHandlerImpl";
import { SellerRouterImpl } from "./api/seller/router/SellerRouterImpl";
import { UserHandlerImpl } from "./api/user/handler/UserHandlerImpl";
import { UserRouterImpl } from "./api/user/router/UserRouterImpl";
import { hashImpl } from "./config/crypto";
import connectDatabase from "./config/database";
import { startServer } from "./config/express";
import { AuthorizationBearer } from "./middleware/auth/AuthorizationBearer";
import { BasicAuthMiddleware } from "./middleware/auth/BasicAuth";
import { CartPrismaRepositoryImpl } from "./repository/cart/CartPrismaRepositoryImpl";
import { CartItemStockUpdatePrismaImpl } from "./repository/facade/CartItemStockUpdate/CartItemStockUpdatePrismaImpl";
import { OrderItemStockUpdatePrismaImpl } from "./repository/facade/OrderItemStockUpdate/OrderItemStockUpdatePrismaImpl";
import { ItemPrismaRepositoryImpl } from "./repository/item/ItemPrismaRepositoryImpl";
import { OrderPrismaRepositoryImpl } from "./repository/order/OrderPrismaRepositoryImpl";
import { UserPrismaRepositoryImpl } from "./repository/user/UserPrismaRepositoryImpl";
import { AuthServiceImpl } from "./services/auth/AuthServiceImpl";
import { CartServiceImpl } from "./services/cart/CartServiceImpl";
import { ItemServiceImpl } from "./services/item/ItemServiceImpl";
import { OrderServiceImpl } from "./services/order/OrderServiceImpl";
import { UserServiceImpl } from "./services/user/UserServiceImpl";
import { JoiValidatorImpl } from "./utils/validator/JoiValidatorImpl";

// * repositories
const userRepository = new UserPrismaRepositoryImpl();
const itemRepository = new ItemPrismaRepositoryImpl();
const cartRepository = new CartPrismaRepositoryImpl();
const orderRepository = new OrderPrismaRepositoryImpl();
const orderItemStockUpdateRepository = new OrderItemStockUpdatePrismaImpl({
  cartRepository,
});
const cartItemStockUpdateRepository = new CartItemStockUpdatePrismaImpl();
// * services
const userService = new UserServiceImpl({ userRepository }, hashImpl);
const itemService = new ItemServiceImpl({ itemRepository });
const authService = new AuthServiceImpl();
const cartService = new CartServiceImpl({
  cartRepository,
  itemRepository,
  cartItemStockUpdateRepository,
});
const orderService = new OrderServiceImpl({
  cartRepository,
  orderRepository,
  orderItemStockUpdateRepository,
  userRepository,
});
// * validators
const schemaValidator = new JoiValidatorImpl();
// * handlers
const userHandler = new UserHandlerImpl(
  { authService, userService },
  schemaValidator
);
const itemHandler = new ItemHandlerImpl({ itemService }, { schemaValidator });
const fileHandler = new FileHandlerImpl();
const cartHandler = new CartHandlerImpl({ cartService }, { schemaValidator });
const buyerHandler = new BuyerHandlerImpl({ cartService, orderService });
const orderHandler = new OrderHandlerImpl(
  { orderService },
  { schemaValidator }
);
const sellerHandler = new SellerHandlerImpl({ cartService, orderService });
// * misc
const basicAuthMiddleware = new BasicAuthMiddleware(userService, hashImpl);
const authorizationMiddleware = new AuthorizationBearer(userService);
// * routers
const userRouter = new UserRouterImpl(
  userHandler,
  basicAuthMiddleware,
  authorizationMiddleware
);
const itemRouter = new ItemRouterImpl(itemHandler, authorizationMiddleware);
const fileRouter = new FileRouterImpl(fileHandler, authorizationMiddleware);
const cartRouter = new CartRouterImpl(cartHandler, authorizationMiddleware);
const buyerRouter = new BuyerRouterImpl(buyerHandler, authorizationMiddleware);
const orderRouter = new OrderRouterImpl(orderHandler, authorizationMiddleware);
const sellerRouter = new SellerRouterImpl(
  sellerHandler,
  authorizationMiddleware
);

connectDatabase();

startServer([
  userRouter,
  itemRouter,
  fileRouter,
  cartRouter,
  buyerRouter,
  orderRouter,
  sellerRouter,
]).start();
