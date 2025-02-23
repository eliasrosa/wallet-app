import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	console.log("Seeding database...");

	const listFII = [
		"VISC11",
		"VGHF11",
		"SARE11",
		"RZAG11",
		"TRXF11",
		"BTLG11",
		"GGRC11",
		"CPTI11",
		"CPTS11",
		"KNCR11",
		"BDIF11",
		"KNRI11",
		"XPML11",
		"BTCI11",
		"MXRF11",
		"XPLG11",
	];

	const listETF = ["BOVA11", "GOLD11", "IVVB11", "HASH11", "SMAL11", "XINA11"];

	await prisma.ticker.updateMany({
		where: { id: { in: listFII } },
		data: { type: "FII" },
	});

	await prisma.ticker.updateMany({
		where: { id: { in: listETF } },
		data: { type: "ETF" },
	});
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
