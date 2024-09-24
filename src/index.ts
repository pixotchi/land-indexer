import { ponder } from "@/generated";

ponder.on("LandContract:LandMinted", async ({ event, context }) => {
  const { Land, LandMintedEvent } = context.db;

  await Land.create({
    id: event.args.tokenId,
    data: {
      owner: event.args.to,
    },
  });

  await LandMintedEvent.create({
    id: event.args.tokenId,//`${event.log.transactionHash}-${event.log.logIndex}`,
    data: {
      to: event.args.to,
      tokenId: event.args.tokenId,
      mintPrice: event.args.mintPrice,
    },
  });
});

ponder.on("LandContract:Transfer", async ({ event, context }) => {
  const { Land, LandTransferEvent } = context.db;

  await Land.update({
    id: event.args.value,
    data: {
      owner: event.args.to,
    },
  });

  await LandTransferEvent.create({
    id: event.args.value,//`${event.log.transactionHash}-${event.log.logIndex}`,
    data: {
      from: event.args.from,
      to: event.args.to,
      tokenId: event.args.value,
    },
  });
});

ponder.on("LandContract:LandNameChanged", async ({ event, context }) => {
  const { Land, LandNameChangedEvent } = context.db;

  await Land.update({
    id: event.args.tokenId,
    data: {
      name: event.args.name,
    },
  });

  await LandNameChangedEvent.create({
    id: event.args.tokenId,//`${event.log.transactionHash}-${event.log.logIndex}`,
    data: {
      tokenId: event.args.tokenId,
      name: event.args.name,
    },
  });
});

ponder.on("LandContract:PlantLifetimeAssigned", async ({ event, context }) => {
  const { Plant, PlantLifetimeAssignedEvent } = context.db;

  await Plant.upsert({
    id: event.args.plantId,
    create: {
      landId: event.args.landId,
      lifetime: event.args.newLifetime,
      points: 0n,
    },
    update: {
      lifetime: event.args.newLifetime,
    },
  });

  await PlantLifetimeAssignedEvent.create({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    data: {
      landId: event.args.landId,
      plantId: event.args.plantId,
      lifetime: event.args.lifetime,
      newLifetime: event.args.newLifetime,
    },
  });
});

ponder.on("LandContract:PlantPointsAssigned", async ({ event, context }) => {
  const { Plant, PlantPointsAssignedEvent } = context.db;

  await Plant.update({
    id: event.args.plantId,
    data: ({ current }) => ({
      points: current.points + event.args.addedPoints,
    }),
  });

  await PlantPointsAssignedEvent.create({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    data: {
      landId: event.args.landId,
      plantId: event.args.plantId,
      addedPoints: event.args.addedPoints,
      newPlantPoints: event.args.newPlantPoints,
    },
  });
});

ponder.on("LandContract:VillageProductionClaimed", async ({ event, context }) => {
  const { VillageProductionClaimedEvent } = context.db;

  await VillageProductionClaimedEvent.create({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    data: {
      landId: event.args.landId,
      buildingId: event.args.buildingId,
    },
  });
});

ponder.on("LandContract:VillageProductionXPClaimCooldownActive", async ({ event, context }) => {
  const { VillageProductionXPClaimCooldownActiveEvent } = context.db;

  await VillageProductionXPClaimCooldownActiveEvent.create({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    data: {
      landId: event.args.landId,
      buildingId: event.args.buildingId,
      currentTime: event.args.currentTime,
      cooldownEndTime: event.args.cooldownEndTime,
    },
  });
});

ponder.on("LandContract:VillageProductionXPClaimed", async ({ event, context }) => {
  const { VillageProductionXPClaimedEvent } = context.db;

  await VillageProductionXPClaimedEvent.create({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    data: {
      landId: event.args.landId,
      buildingId: event.args.buildingId,
      claimTime: event.args.claimTime,
      xpAwarded: event.args.xpAwarded,
    },
  });
});

ponder.on("LandContract:VillageSpeedUpWithSeed", async ({ event, context }) => {
  const { VillageSpeedUpWithSeedEvent } = context.db;

  await VillageSpeedUpWithSeedEvent.create({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    data: {
      landId: event.args.landId,
      buildingId: event.args.buildingId,
      speedUpCost: event.args.speedUpCost,
      xp: event.args.xp,
    },
  });
});

ponder.on("LandContract:VillageUpgradedWithLeaf", async ({ event, context }) => {
  const { VillageUpgradedWithLeafEvent } = context.db;

  await VillageUpgradedWithLeafEvent.create({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    data: {
      landId: event.args.landId,
      buildingId: event.args.buildingId,
      upgradeCost: event.args.upgradeCost,
      xp: event.args.xp,
    },
  });
});

ponder.on("LandContract:TownSpeedUpWithSeed", async ({ event, context }) => {
  const { TownSpeedUpWithSeedEvent } = context.db;

  await TownSpeedUpWithSeedEvent.create({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    data: {
      landId: event.args.landId,
      buildingId: event.args.buildingId,
      speedUpCost: event.args.speedUpCost,
      xp: event.args.xp,
    },
  });
});

ponder.on("LandContract:TownUpgradedWithLeaf", async ({ event, context }) => {
  const { TownUpgradedWithLeafEvent } = context.db;

  await TownUpgradedWithLeafEvent.create({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    data: {
      landId: event.args.landId,
      buildingId: event.args.buildingId,
      upgradeCost: event.args.upgradeCost,
      xp: event.args.xp,
    },
  });
});

ponder.on("LandContract:QuestStarted", async ({ event, context }) => {
  const { QuestStartedEvent } = context.db;

  await QuestStartedEvent.create({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    data: {
      landId: event.args.landId,
      farmerSlotId: event.args.farmerSlotId,
      difficulty: event.args.difficulty,
      startBlock: event.args.startBlock,
      endBlock: event.args.endBlock,
    },
  });
});

ponder.on("LandContract:QuestCommitted", async ({ event, context }) => {
  const { QuestCommittedEvent } = context.db;

  await QuestCommittedEvent.create({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    data: {
      landId: event.args.landId,
      farmerSlotId: event.args.farmerSlotId,
      pseudoRndBlock: event.args.pseudoRndBlock,
    },
  });
});

ponder.on("LandContract:QuestFinalized", async ({ event, context }) => {
  const { QuestFinalizedEvent } = context.db;

  await QuestFinalizedEvent.create({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    data: {
      landId: event.args.landId,
      farmerSlotId: event.args.farmerSlotId,
      player: event.args.player,
      rewardType: event.args.rewardType,
      amount: event.args.amount,
    },
  });
});

ponder.on("LandContract:QuestReset", async ({ event, context }) => {
  const { QuestResetEvent } = context.db;

  await QuestResetEvent.create({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    data: {
      landId: event.args.landId,
      farmerSlotId: event.args.farmerSlotId,
      player: event.args.player,
    },
  });
});

ponder.on("LandContract:XPAdded", async ({ event, context }) => {
  const { XPAddedEvent } = context.db;

  await XPAddedEvent.create({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    data: {
      tokenId: event.args.tokenId,
      amount: event.args.amount,
    },
  });
});

ponder.on("LandContract:WareHouseLifetimeAssigned", async ({ event, context }) => {
  const { WareHouseLifetimeAssignedEvent } = context.db;

  await WareHouseLifetimeAssignedEvent.create({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    data: {
      landId: event.args.landId,
      plantId: event.args.plantId,
      lifetime: event.args.lifetime,
      newLifetime: event.args.newLifetime,
    },
  });
});

ponder.on("LandContract:WareHousePlantPointsAssigned", async ({ event, context }) => {
  const { WareHousePlantPointsAssignedEvent } = context.db;

  await WareHousePlantPointsAssignedEvent.create({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    data: {
      landId: event.args.landId,
      plantId: event.args.plantId,
      addedPoints: event.args.addedPoints,
      newPlantPoints: event.args.newPlantPoints,
    },
  });
});
