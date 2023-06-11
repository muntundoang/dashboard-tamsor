const { PrismaClient } = require("@prisma/client");
const { hashPassword } = require("../middleware/bcrypt");
const prisma = new PrismaClient();

async function main() {
  const firstUser = await prisma.user.upsert({
    where: { email: "kuproy@mail.com" },
    update: {},
    create: {
      username: "kuproy",
      password: hashPassword("kuproy"),
      role: "admin",
      birthday: new Date("2023-04-03"),
      contact: "08112400365",
      email: "kuproy@mail.com",
      name: " Rio Lukman Tawekal",
      address: "kepo",
      photo:
        "https://w7.pngwing.com/pngs/340/956/png-transparent-profile-user-icon-computer-icons-user-profile-head-ico-miscellaneous-black-desktop-wallpaper.png",
    },
  });

  console.log("seed user==> ", firstUser);

  const firstCategory = await prisma.category.upsert({
    where: { name: "Milk" },
    update: {},
    create: {
      name: "Milk",
    },
  });

  const secondCategory = await prisma.category.upsert({
    where: { name: "Coffee Beans Arabica" },
    update: {},
    create: {
      name: "Coffee Beans Arabica",
    },
  });

  const thirdCategory = await prisma.category.upsert({
    where: { name: "Coffee Beans House Blend" },
    update: {},
    create: {
      name: "Coffee Beans House Blend",
    },
  });

  console.log("seed category==> ", firstCategory);

  const firstStockProduct = await prisma.stock.upsert({
    where: { name: "Fresh Milk Greenfield" },
    update: {},
    create: {
      name: "Fresh Milk Greenfield",
      categoryId: firstCategory.id,
      brand: "Green Field",
      isActive: true,
      safetyStock: 6,
      currentStock: 6,
      netPerPack: 1000,
      pricePerPack: 16700,
      dimension: "gram",
    },
  });

  console.log("seed product==> ", firstStockProduct);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
