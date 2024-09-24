import { ponder } from "@/generated";
import { graphql } from "@ponder/core";

ponder.use("/graphql", graphql());
ponder.use("/", graphql());

// ponder.on("LandContract:LandMinted", async (ctx) => {
//   // const { event, block } = ctx;
//   // const { tokenId, to } = event.args;
//   // const land = await ctx.db.select().from(lands).where(eq(lands.tokenId, tokenId));
// });
