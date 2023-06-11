//<a href="https://cryptoresearch.report" target="_blank"  rel="noopener noreferrer"></a>
({
    previous: {
        class: "skytopia",
        route: "skytopia",
        logo: "/assets/img/skytopia/st-logo.png",
        slogan: "With XP.NETWORK, Skytopia</br> becomes the first-ever</br> game...",
    },
    name: "Arbitrum",
    title: {
        centred: true,
        short: "Arbitrum Nova is live on</br> XP.NETWORK bridge...",
        desk: "Arbitrum Nova is live on</br> XP.NETWORK bridge: what you</br> need to know",
        mob: "Arbitrum Nova is live on</br> XP.NETWORK bridge:</br> what you need to know",
    },
    overview:
        "Arbitrum Nova is the new L2 scaling solution by Offchain Labs – cheaper and more efficient than Arbitrum One. It’s the future of the Arbitrum ecosystem, and it even has an emerging NFT market already. So if you’re not familiar with Nova yet, read our beginner guide. ",
    site: {
        text: "nova.arbitrum.io",
        link: "https://nova.arbitrum.io/",
    },
    distantPic: 0, //width of some  decorative absolute positions image on header background (0 if doesn't exist)
    content: [
        {
            h2: "What is Arbitrum and optimistic rollups?",
        },

        {
            p: `
      Arbitrum is an Ethereum rollup – a layer-2 (L2) solution that allows users to transact with ETH and other tokens on Ethereum much faster and cheaper than on the Ethereum mainnet itself. 14 times cheaper, in fact: you’ll pay only $0.06 to send ETH on Arbitrum as opposed to $0.85 on the L1.

      As for speed, Ethereum L1 is limited to 20-40 transactions per second, while Arbitrum can theoretically process up to 40,000 TPS.
      
      Arbitrum belongs to the so-called optimistic rollup category. The way it works is process a bunch of transactions, then pack them into a single bundle, send it to Ethereum, and record the whole bundle there as a single rollup transaction. 
      
      The term “optimistic” means that the chain assumes that all the transactions it processes are valid. An optimistic rollup doesn’t verify all the transactions one by one. However, a user can contest an operation if they think it’s fraudulent, in which case a check is conducted. In other words, Arbitrum uses Ethereum’s security.
      
      The time window for contestations is 7 days. Because of this, it can take up to a week to withdraw ETH from Arbitrum to Ethereum. 
      
      Users are required to stake some ETH to use the full power of Arbitrum, and if someone protests against a transaction that turns out to be valid, the user loses part of their stake. But if a contested transaction is found to be fraudulent, then whoever posted it loses their stake. 
      
      The developer of Arbitrum is Offchain Labs, whose CEO Ed Felten used to work as CTO for the US White House. He created the L2 together with two of his PhD students, Harry Calodner and Steven Goldfeder. 
      
      Arbitrum is EVM-compatible, so you can add it to MetaMask. Its native governance token is $ARB, while ETH is used to pay gas fees on Arbitrum. $ARB was famously airdropped to 600,000 rollup users in March 2023. The airdrop caused such a hype that  fake airdrop scams popped up all over Twitter. Around the same time, the governance over the chain was transferred to the Arbitrum DAO. 
        `,
        },

        {
            h2: "Arbitrum Nova vs. Arbitrum One",
        },

        {
            p: `
      When people say Arbitrum, they usually mean Arbitrum One – the blockchain that <a href="https://news.bitcoin.com/offchain-labs-launches-arbitrum-one-mainnet-startup-raises-120-million/" target="_blank"  rel="noopener noreferrer">went live in August 2021</a>. It’s the 4th largest blockchain by DeFi TVL ($3.4 billion), <a href="https://defillama.com/chain/Arbitrum?tvl=true" target="_blank"  rel="noopener noreferrer">according to DeFiLlama</a> – far ahead of its main rival, Optimism ($1.18 billion). Arbitrum has certain advantages over Optimism, which was launched earlier: for example, Arbitrum has its own trustless bridge and virtual machine. 
      However, by August 2022 Offchain Labs was ready to release a more advanced rollup chain: <a href="https://nova.arbitrum.io/" target="_blank"  rel="noopener noreferrer">Arbitrum Nova</a>. Both chains now run in parallel, and there are significant differences between them.
        `,
        },

        {
            h4: "Posting data on L1 vs. AnyTrust",
        },

        {
            p: `
      Arbitrum One posts all L2 transaction data on Ethereum, so that validators can verify if a transaction is fraudulent or correct. Posting all that information costs a lot of gas.
Nova uses a completely different verification technology, called <a href="https://developer.arbitrum.io/inside-anytrust" target="_blank"  rel="noopener noreferrer">AnyTrust</a>. It refers to a special Data Availability Committee, whose members store transaction data and supply it to validators in the form of Data Availability Certificates, or DACerts. Each certificate contains a block hash, proof that the necessary number of the committee members have signed it, etc. 
The way the Committee is constructed, it’s enough for at least two of its members to be honest. If something goes wrong, the system will use Arbitrum One as fallback. Note that Offchain Labs makes a distinction between the two names of the chains (One and Nova) and the names of the technologies: Arbitrum Rollup and Arbitrum AnyTrust.  
        `,
        },

        {
            h4: "Ultra-low fees and scalability",
        },

        {
            p: `
      On Nova, only DACerts are posted on the L1 instead of the full transaction data. As a result, Nova is much cheaper to use than One. The <a href="https://developer.arbitrum.io/arbos/gas" target="_blank"  rel="noopener noreferrer">minimum allowed gas price on Nova is 0.01 gwei</a>, while on One it’s 0.1 gwei. Thus, a transaction that takes the same amount of computation effort in gas (= has the same op codes) can cost 10 times less on Nova. 
Nova is also more scalable, making it a great choice for high-load dApps like NFT-based games and Web3 social networks
      `,
        },

        { img: "1" },

        {
            h4: `
      Ecosystem
      `,
        },

        {
            p: `
      Arbitrum One features many of the same DeFi protocols that you’ll find on Ethereum: Uniswap, Balancer, Aave, Sushi, Curve, etc. Interestingly, Avalanche-native TraderJoe has also found popularity in the Arbitrum ecosystem. 
      Nova also features Sushi - probably the single DeFi dApp with the biggest number of supported chains (26). <a href="https://defillama.com/chain/Arbitrum%20Nova" target="_blank"  rel="noopener noreferrer">Other leading dApps on Nova</a> are the less-known Arbswap, RCPswap, Symbiosis Finance, and Archly Finance. DeFi giants like Uniswap and Aave still haven’t made their grand entrance on Arbitrum Nova. 
      `,
        },

        { img: "2" },

        {
            h4: `
      TVL
      `,
        },

        {
            p: `
      So far, Arbitrum One has a far higher TVL: $3.4 billion as opposed to a little <a href="https://defillama.com/chain/Arbitrum%20Nova" target="_blank"  rel="noopener noreferrer">less than $5 million on Nova</a>. However, remember that Nova launched a year later, and at the height of the bear market at that. The transaction load isn’t high, either: around 1 TPS.
      You can see all Nova transactions in the <a href="https://nova.arbiscan.io/" target="_blank"  rel="noopener noreferrer">Arbiscan Explorer</a>.
      `,
        },

        { img: "3" },

        {
            h4: `
      How to begin
      `,
        },

        {
            p: `
      Users have to options to start interacting with Arbitrum Rollup (One):
      1) Bridge ETH from Ethereum to Arbitrum, then use it to buy any other required tokens on an Arbitrum DEX;
      2) Withdraw ETH from a CEX like Binance to Arbitrum One.
      By contrast, if you want to use Arbitrum Nova, you’ll need to refer to the <a href="https://bridge.arbitrum.io/?l2ChainId=42170" target="_blank"  rel="noopener noreferrer">decentralized bridge</a>, as CEX platforms don’t support withdrawals to the new chain yet.
      `,
        },

        {
            h4: `
      NFT ecosystem on Arbitrum Nova
      `,
        },

        {
            p: `
    At XP.NETWORK, we made the decision to integrate Arbitrum Nova into our multichain NFT bridge, rather than Arbitrum Nova. The key reason is that Nova is designed with NFT dApps and games in mind, while One is much more DeFi-oriented. 
    The integration process itself wasn’t too different from other EVM chains. Our dev team is highly experienced with all sorts of NFT standards, and Nova supports the same ones as Ethereum. 
    `,
        },

        {
            p: `
    We are always seeking out new NFT-optimized ecosystems, be it MultiversX (Elrond), SKALEverse, or Nova. The NFT market on the new Arbitrum chain is only just emerging, but there are already a <a href="https://portal.arbitrum.io/nova?categories=nfts" target="_blank"  rel="noopener noreferrer">few projects we can mention</a>: 
    <strong>Collections:</strong> NovaApes, ArbiNovaNauts, Nova Mushroom, Nova Checks, NovaPunks, ArbiGods, DeathBite, Cyber Waifu, etc.
    <strong>Marketplaces:</strong> <a href="https://babylons.io/nft-marketplace" target="_blank"  rel="noopener noreferrer">Babylons</a>, <a href="https://nova.exhibitio.io/stats" target="_blank"  rel="noopener noreferrer">Exhibitio</a>, <a href="https://app.treasure.lol/" target="_blank"  rel="noopener noreferrer">Trove</a>, TofuNFT, <a href="https://opensea.io/rankings?chain=arbitrum" target="_blank"  rel="noopener noreferrer">OpenSea</a> (yes, it supports Nova, too)
    `,
        },

        { img: "4" },

        {
            p: `<strong>Games & social NFTs:</strong> Legends of Eros, Space ID, Metagates, DroEats`,
        },

        {
            p: `
          Of course, the volumes aren’t that huge yet: for example, the top-selling NFT collection on Babylons, Nova Mushroom, has a bit over $11k in 30D sales. However, this is just the beginning – and now that you can bridge NFTs between Arbitrum Nova, Ethereum, Polygon, and 25+ chains, we are sure that things will speed up even further. 
          `,
        },

        { img: "5" },

        {
            p: `
          If you have an NFT project and would like to gain more marketing and media exposure, bridging a collection to Arbitrum Nova would be a very interesting idea. It’s very cost-efficient, and your project could be among the first ones ever to bridge to this exciting L2. 
          Such a bridging campaign could even be organized as a viral community initiative with incentives and prizes, using XP.NETWORK’s handy widget: it can be integrated into the front end of any website in as little as 10 minutes. And thanks to our batch-bridging technology, you can transfer a large number of NFTs in one go and save on fees. So why not consider developing your NFT game on Nova as an experiment?
          `,
        },

        { img: "6" },
    ],
    cardParent: "cs-solana",
});
