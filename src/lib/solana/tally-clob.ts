export type TallyClob = {
  version: "0.1.0";
  name: "tally_clob";
  instructions: [
    {
      name: "authorizeUser";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "authorizedUser";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "authorized";
          type: "bool";
        },
        {
          name: "userKey";
          type: "publicKey";
        },
      ];
    },
    {
      name: "initMarket";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "authorizedUser";
          isMut: true;
          isSigner: false;
        },
        {
          name: "market";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "initSubMarkets";
          type: {
            vec: {
              defined: "InitSubMarket";
            };
          };
        },
        {
          name: "marketKey";
          type: "publicKey";
        },
      ];
    },
    {
      name: "initWallet";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "user";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "userKey";
          type: "publicKey";
        },
      ];
    },
    {
      name: "addToBalance";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "user";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "amount";
          type: "u128";
        },
        {
          name: "userId";
          type: "u64";
        },
        {
          name: "depositId";
          type: "u64";
        },
      ];
    },
    {
      name: "addToUnreedeemable";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "user";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "amount";
          type: "u128";
        },
        {
          name: "userId";
          type: "u64";
        },
      ];
    },
    {
      name: "withdrawFromBalance";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "user";
          isMut: true;
          isSigner: false;
        },
        {
          name: "fromUsdcAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "toUsdcAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeUsdcAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "amount";
          type: "u128";
        },
        {
          name: "userId";
          type: "u64";
        },
        {
          name: "withdrawId";
          type: "u64";
        },
      ];
    },
    {
      name: "fairLaunchOrder";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "user";
          isMut: true;
          isSigner: false;
        },
        {
          name: "market";
          isMut: true;
          isSigner: false;
        },
        {
          name: "marketPortfolio";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "orders";
          type: {
            vec: {
              defined: "Order";
            };
          };
        },
        {
          name: "userId";
          type: "u64";
        },
      ];
    },
    {
      name: "bulkBuyByPrice";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "user";
          isMut: true;
          isSigner: false;
        },
        {
          name: "market";
          isMut: true;
          isSigner: false;
        },
        {
          name: "marketPortfolio";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "fromUsdcAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeUsdcAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "orders";
          type: {
            vec: {
              defined: "Order";
            };
          };
        },
        {
          name: "userId";
          type: "u64";
        },
      ];
    },
    {
      name: "bulkBuyByShares";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "user";
          isMut: true;
          isSigner: false;
        },
        {
          name: "market";
          isMut: true;
          isSigner: false;
        },
        {
          name: "marketPortfolio";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "fromUsdcAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeUsdcAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "orders";
          type: {
            vec: {
              defined: "Order";
            };
          };
        },
        {
          name: "userId";
          type: "u64";
        },
      ];
    },
    {
      name: "bulkSellByPrice";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "user";
          isMut: true;
          isSigner: false;
        },
        {
          name: "market";
          isMut: true;
          isSigner: false;
        },
        {
          name: "marketPortfolio";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "fromUsdcAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeUsdcAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "orders";
          type: {
            vec: {
              defined: "Order";
            };
          };
        },
        {
          name: "userId";
          type: "u64";
        },
      ];
    },
    {
      name: "bulkSellByShares";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "user";
          isMut: true;
          isSigner: false;
        },
        {
          name: "market";
          isMut: true;
          isSigner: false;
        },
        {
          name: "marketPortfolio";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "fromUsdcAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeUsdcAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "orders";
          type: {
            vec: {
              defined: "Order";
            };
          };
        },
        {
          name: "userId";
          type: "u64";
        },
      ];
    },
    {
      name: "resolveMarket";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "authorizedUser";
          isMut: true;
          isSigner: false;
        },
        {
          name: "market";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "fromUsdcAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeUsdcAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "subMarketId";
          type: "u64";
        },
        {
          name: "choiceId";
          type: "u64";
        },
      ];
    },
    {
      name: "startTrading";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "authorizedUser";
          isMut: true;
          isSigner: false;
        },
        {
          name: "market";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "subMarketId";
          type: "u64";
        },
      ];
    },
    {
      name: "claimWinnings";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "user";
          isMut: true;
          isSigner: false;
        },
        {
          name: "market";
          isMut: true;
          isSigner: false;
        },
        {
          name: "marketPortfolio";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "subMarketId";
          type: "u64";
        },
        {
          name: "choiceId";
          type: "u64";
        },
        {
          name: "userId";
          type: "u64";
        },
      ];
    },
  ];
  accounts: [
    {
      name: "authorizedUser";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "authorized";
            type: "bool";
          },
        ];
      };
    },
    {
      name: "marketPortfolio";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "subMarketPortfolio";
            type: {
              vec: {
                defined: "SubMarketPortfolio";
              };
            };
          },
        ];
      };
    },
    {
      name: "market";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "subMarkets";
            type: {
              vec: {
                defined: "SubMarket";
              };
            };
          },
        ];
      };
    },
    {
      name: "user";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "balance";
            type: "u128";
          },
          {
            name: "unreedemableBalance";
            type: "u128";
          },
        ];
      };
    },
  ];
  types: [
    {
      name: "BuyOrderValues";
      type: {
        kind: "struct";
        fields: [
          {
            name: "sharesToBuy";
            type: "u128";
          },
          {
            name: "buyPrice";
            type: "u128";
          },
          {
            name: "feePrice";
            type: "u128";
          },
        ];
      };
    },
    {
      name: "SellOrderValues";
      type: {
        kind: "struct";
        fields: [
          {
            name: "sharesToSell";
            type: "u128";
          },
          {
            name: "sellPrice";
            type: "u128";
          },
          {
            name: "feePrice";
            type: "u128";
          },
        ];
      };
    },
    {
      name: "ChoiceMarket";
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            type: "u64";
          },
          {
            name: "usdcPot";
            type: "u128";
          },
          {
            name: "potShares";
            type: "u128";
          },
          {
            name: "mintedShares";
            type: "u128";
          },
          {
            name: "fairLaunchPot";
            type: "u128";
          },
          {
            name: "winningChoice";
            type: "bool";
          },
        ];
      };
    },
    {
      name: "ChoicePortfolio";
      type: {
        kind: "struct";
        fields: [
          {
            name: "choiceId";
            type: "u64";
          },
          {
            name: "shares";
            type: "u128";
          },
          {
            name: "claimed";
            type: "bool";
          },
        ];
      };
    },
    {
      name: "Order";
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            type: "u64";
          },
          {
            name: "amount";
            type: "u128";
          },
          {
            name: "subMarketId";
            type: "u64";
          },
          {
            name: "choiceId";
            type: "u64";
          },
          {
            name: "requestedPricePerShare";
            type: "f64";
          },
        ];
      };
    },
    {
      name: "FinalOrder";
      type: {
        kind: "struct";
        fields: [
          {
            name: "orderId";
            type: "u64";
          },
          {
            name: "subMarketId";
            type: "u64";
          },
          {
            name: "choiceId";
            type: "u64";
          },
          {
            name: "price";
            type: "u128";
          },
          {
            name: "shares";
            type: "u128";
          },
          {
            name: "feePrice";
            type: "u128";
          },
          {
            name: "avgSharePrice";
            type: "f64";
          },
        ];
      };
    },
    {
      name: "SubMarketPortfolio";
      type: {
        kind: "struct";
        fields: [
          {
            name: "subMarketId";
            type: "u64";
          },
          {
            name: "choicePortfolio";
            type: {
              vec: {
                defined: "ChoicePortfolio";
              };
            };
          },
        ];
      };
    },
    {
      name: "InitSubMarket";
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            type: "u64";
          },
          {
            name: "choiceIds";
            type: {
              vec: "u64";
            };
          },
          {
            name: "fairLaunchStart";
            type: "i64";
          },
          {
            name: "fairLaunchEnd";
            type: "i64";
          },
          {
            name: "tradingStart";
            type: "i64";
          },
          {
            name: "tradingEnd";
            type: "i64";
          },
          {
            name: "initPot";
            type: "u128";
          },
        ];
      };
    },
    {
      name: "SubMarket";
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            type: "u64";
          },
          {
            name: "invariant";
            type: "u128";
          },
          {
            name: "choices";
            type: {
              vec: {
                defined: "ChoiceMarket";
              };
            };
          },
          {
            name: "fairLaunchStart";
            type: "i64";
          },
          {
            name: "fairLaunchEnd";
            type: "i64";
          },
          {
            name: "tradingStart";
            type: "i64";
          },
          {
            name: "tradingEnd";
            type: "i64";
          },
          {
            name: "resolved";
            type: "bool";
          },
        ];
      };
    },
    {
      name: "MarketStatus";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Initializing";
          },
          {
            name: "FairLaunch";
          },
          {
            name: "Trading";
          },
          {
            name: "Closed";
          },
        ];
      };
    },
  ];
  events: [
    {
      name: "FairLaunchOrderEvent";
      fields: [
        {
          name: "orderId";
          type: "u64";
          index: false;
        },
        {
          name: "totalAmount";
          type: "u128";
          index: false;
        },
        {
          name: "shares";
          type: "u128";
          index: false;
        },
        {
          name: "avgSharePrice";
          type: "f64";
          index: false;
        },
        {
          name: "fees";
          type: "u128";
          index: false;
        },
      ];
    },
    {
      name: "OrderEvent";
      fields: [
        {
          name: "orderId";
          type: "u64";
          index: false;
        },
        {
          name: "totalAmount";
          type: "u128";
          index: false;
        },
        {
          name: "shares";
          type: "u128";
          index: false;
        },
        {
          name: "avgSharePrice";
          type: "f64";
          index: false;
        },
        {
          name: "fees";
          type: "u128";
          index: false;
        },
      ];
    },
    {
      name: "BalanceEvent";
      fields: [
        {
          name: "userId";
          type: "u64";
          index: false;
        },
        {
          name: "unreedemableBalance";
          type: "u128";
          index: false;
        },
        {
          name: "usdcBalance";
          type: "u128";
          index: false;
        },
      ];
    },
    {
      name: "MarketAdjustEvent";
      fields: [
        {
          name: "choiceId";
          type: "u64";
          index: false;
        },
        {
          name: "newChoicePot";
          type: "u128";
          index: false;
        },
        {
          name: "newMintedShares";
          type: "u128";
          index: false;
        },
        {
          name: "newChoiceShares";
          type: "u128";
          index: false;
        },
        {
          name: "otherChoiceId";
          type: "u64";
          index: false;
        },
        {
          name: "newOtherChoiceShares";
          type: "u128";
          index: false;
        },
      ];
    },
    {
      name: "PortfolioEvent";
      fields: [
        {
          name: "choiceId";
          type: "u64";
          index: false;
        },
        {
          name: "userId";
          type: "u64";
          index: false;
        },
        {
          name: "sharesOwned";
          type: "u128";
          index: false;
        },
        {
          name: "buyValue";
          type: "u128";
          index: false;
        },
        {
          name: "sellValue";
          type: "u128";
          index: false;
        },
        {
          name: "sharesBought";
          type: "u128";
          index: false;
        },
        {
          name: "sharesSold";
          type: "u128";
          index: false;
        },
        {
          name: "isFairLaunch";
          type: "bool";
          index: false;
        },
        {
          name: "claimed";
          type: "bool";
          index: false;
        },
      ];
    },
    {
      name: "FairLaunchMarketEvent";
      fields: [
        {
          name: "subMarketId";
          type: "u64";
          index: false;
        },
        {
          name: "newInvariant";
          type: "u128";
          index: false;
        },
        {
          name: "choiceId";
          type: "u64";
          index: false;
        },
        {
          name: "newChoicePot";
          type: "u128";
          index: false;
        },
        {
          name: "mintedShares";
          type: "u128";
          index: false;
        },
        {
          name: "newChoiceShares";
          type: "u128";
          index: false;
        },
        {
          name: "otherChoiceId";
          type: "u64";
          index: false;
        },
        {
          name: "newOtherChoiceShares";
          type: "u128";
          index: false;
        },
      ];
    },
    {
      name: "DepositEvent";
      fields: [
        {
          name: "depositId";
          type: "u64";
          index: false;
        },
      ];
    },
    {
      name: "WithdrawalEvent";
      fields: [
        {
          name: "withdrawId";
          type: "u64";
          index: false;
        },
      ];
    },
  ];
  errors: [
    {
      code: 6000;
      name: "AmountToAddTooLow";
      msg: "Amount to add can't be less than 0.";
    },
    {
      code: 6001;
      name: "AmountToWithdrawTooLow";
      msg: "Amount to withdraw can't be less than 0.";
    },
    {
      code: 6002;
      name: "AmountToWithdrawTooGreat";
      msg: "Amount to withdraw can't be greater than balance.";
    },
    {
      code: 6003;
      name: "NotAuthorized";
      msg: "You do not have the authorization to use this instruction.";
    },
    {
      code: 6004;
      name: "SubMarketNotFound";
      msg: "Sub market not found.";
    },
    {
      code: 6005;
      name: "ChoiceNotFound";
      msg: "Choice not found.";
    },
    {
      code: 6006;
      name: "ChoicePortfolioNotFound";
      msg: "Choice portfolio not found, please buy some shares first.";
    },
    {
      code: 6007;
      name: "BalanceTooLow";
      msg: "Not enough balance to make order.";
    },
    {
      code: 6008;
      name: "MarketIntializing";
      msg: "Market is still intializing, please try again later.";
    },
    {
      code: 6009;
      name: "MarketClosed";
      msg: "Market is closed, please check the results.";
    },
    {
      code: 6010;
      name: "MarketNotResolved";
      msg: "Market is not resolved yet, check back later.";
    },
    {
      code: 6011;
      name: "NotWinningChoice";
      msg: "This is not a winning choice.";
    },
    {
      code: 6012;
      name: "NotSellingPeriod";
      msg: "Cannot sell at this time please check in when trading starts.";
    },
    {
      code: 6013;
      name: "NotBuyingPeriod";
      msg: "Cannot buy at this time please check in when its Fair Launch or Trading.";
    },
    {
      code: 6014;
      name: "NotEnoughSharesToSell";
      msg: "Requested shares to sell greater than owned shares.";
    },
    {
      code: 6015;
      name: "SubMarketPortfolioNotFound";
      msg: "Sub market portfolio not found, please buy some shares first.";
    },
    {
      code: 6016;
      name: "BulkOrderTooBig";
      msg: "Bulk order too big.";
    },
    {
      code: 6017;
      name: "SameSubMarket";
      msg: "Order cannot contain multiple multiples of the same sub market.";
    },
    {
      code: 6018;
      name: "AlreadyClaimed";
      msg: "You have already claimed this winnings.";
    },
    {
      code: 6019;
      name: "MarketAlreadyResolved";
      msg: "Market already resolved.";
    },
    {
      code: 6020;
      name: "SharesEstimationOff";
      msg: "Estimated shares is to far off from acutal shares, cancelling order.";
    },
    {
      code: 6021;
      name: "PriceEstimationOff";
      msg: "Requested price is to far off from acutal price, cancelling order.";
    },
    {
      code: 6022;
      name: "NotUSDC";
      msg: "Can only withdraw usdc.";
    },
    {
      code: 6023;
      name: "NotAValidOrder";
      msg: "Not a valid order";
    },
    {
      code: 6024;
      name: "SharesNotEqual";
      msg: "Shares not equal";
    },
  ];
};

export const IDL: TallyClob = {
  version: "0.1.0",
  name: "tally_clob",
  instructions: [
    {
      name: "authorizeUser",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "authorizedUser",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "authorized",
          type: "bool",
        },
        {
          name: "userKey",
          type: "publicKey",
        },
      ],
    },
    {
      name: "initMarket",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "authorizedUser",
          isMut: true,
          isSigner: false,
        },
        {
          name: "market",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "initSubMarkets",
          type: {
            vec: {
              defined: "InitSubMarket",
            },
          },
        },
        {
          name: "marketKey",
          type: "publicKey",
        },
      ],
    },
    {
      name: "initWallet",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "userKey",
          type: "publicKey",
        },
      ],
    },
    {
      name: "addToBalance",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u128",
        },
        {
          name: "userId",
          type: "u64",
        },
        {
          name: "depositId",
          type: "u64",
        },
      ],
    },
    {
      name: "addToUnreedeemable",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u128",
        },
        {
          name: "userId",
          type: "u64",
        },
      ],
    },
    {
      name: "withdrawFromBalance",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "fromUsdcAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "toUsdcAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeUsdcAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u128",
        },
        {
          name: "userId",
          type: "u64",
        },
        {
          name: "withdrawId",
          type: "u64",
        },
      ],
    },
    {
      name: "fairLaunchOrder",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "market",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marketPortfolio",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "orders",
          type: {
            vec: {
              defined: "Order",
            },
          },
        },
        {
          name: "userId",
          type: "u64",
        },
      ],
    },
    {
      name: "bulkBuyByPrice",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "market",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marketPortfolio",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "fromUsdcAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeUsdcAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "orders",
          type: {
            vec: {
              defined: "Order",
            },
          },
        },
        {
          name: "userId",
          type: "u64",
        },
      ],
    },
    {
      name: "bulkBuyByShares",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "market",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marketPortfolio",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "fromUsdcAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeUsdcAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "orders",
          type: {
            vec: {
              defined: "Order",
            },
          },
        },
        {
          name: "userId",
          type: "u64",
        },
      ],
    },
    {
      name: "bulkSellByPrice",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "market",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marketPortfolio",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "fromUsdcAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeUsdcAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "orders",
          type: {
            vec: {
              defined: "Order",
            },
          },
        },
        {
          name: "userId",
          type: "u64",
        },
      ],
    },
    {
      name: "bulkSellByShares",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "market",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marketPortfolio",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "fromUsdcAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeUsdcAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "orders",
          type: {
            vec: {
              defined: "Order",
            },
          },
        },
        {
          name: "userId",
          type: "u64",
        },
      ],
    },
    {
      name: "resolveMarket",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "authorizedUser",
          isMut: true,
          isSigner: false,
        },
        {
          name: "market",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "fromUsdcAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeUsdcAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "subMarketId",
          type: "u64",
        },
        {
          name: "choiceId",
          type: "u64",
        },
      ],
    },
    {
      name: "startTrading",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "authorizedUser",
          isMut: true,
          isSigner: false,
        },
        {
          name: "market",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "subMarketId",
          type: "u64",
        },
      ],
    },
    {
      name: "claimWinnings",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "market",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marketPortfolio",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "subMarketId",
          type: "u64",
        },
        {
          name: "choiceId",
          type: "u64",
        },
        {
          name: "userId",
          type: "u64",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "authorizedUser",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "authorized",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "marketPortfolio",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "subMarketPortfolio",
            type: {
              vec: {
                defined: "SubMarketPortfolio",
              },
            },
          },
        ],
      },
    },
    {
      name: "market",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "subMarkets",
            type: {
              vec: {
                defined: "SubMarket",
              },
            },
          },
        ],
      },
    },
    {
      name: "user",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "balance",
            type: "u128",
          },
          {
            name: "unreedemableBalance",
            type: "u128",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "BuyOrderValues",
      type: {
        kind: "struct",
        fields: [
          {
            name: "sharesToBuy",
            type: "u128",
          },
          {
            name: "buyPrice",
            type: "u128",
          },
          {
            name: "feePrice",
            type: "u128",
          },
        ],
      },
    },
    {
      name: "SellOrderValues",
      type: {
        kind: "struct",
        fields: [
          {
            name: "sharesToSell",
            type: "u128",
          },
          {
            name: "sellPrice",
            type: "u128",
          },
          {
            name: "feePrice",
            type: "u128",
          },
        ],
      },
    },
    {
      name: "ChoiceMarket",
      type: {
        kind: "struct",
        fields: [
          {
            name: "id",
            type: "u64",
          },
          {
            name: "usdcPot",
            type: "u128",
          },
          {
            name: "potShares",
            type: "u128",
          },
          {
            name: "mintedShares",
            type: "u128",
          },
          {
            name: "fairLaunchPot",
            type: "u128",
          },
          {
            name: "winningChoice",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "ChoicePortfolio",
      type: {
        kind: "struct",
        fields: [
          {
            name: "choiceId",
            type: "u64",
          },
          {
            name: "shares",
            type: "u128",
          },
          {
            name: "claimed",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "Order",
      type: {
        kind: "struct",
        fields: [
          {
            name: "id",
            type: "u64",
          },
          {
            name: "amount",
            type: "u128",
          },
          {
            name: "subMarketId",
            type: "u64",
          },
          {
            name: "choiceId",
            type: "u64",
          },
          {
            name: "requestedPricePerShare",
            type: "f64",
          },
        ],
      },
    },
    {
      name: "FinalOrder",
      type: {
        kind: "struct",
        fields: [
          {
            name: "orderId",
            type: "u64",
          },
          {
            name: "subMarketId",
            type: "u64",
          },
          {
            name: "choiceId",
            type: "u64",
          },
          {
            name: "price",
            type: "u128",
          },
          {
            name: "shares",
            type: "u128",
          },
          {
            name: "feePrice",
            type: "u128",
          },
          {
            name: "avgSharePrice",
            type: "f64",
          },
        ],
      },
    },
    {
      name: "SubMarketPortfolio",
      type: {
        kind: "struct",
        fields: [
          {
            name: "subMarketId",
            type: "u64",
          },
          {
            name: "choicePortfolio",
            type: {
              vec: {
                defined: "ChoicePortfolio",
              },
            },
          },
        ],
      },
    },
    {
      name: "InitSubMarket",
      type: {
        kind: "struct",
        fields: [
          {
            name: "id",
            type: "u64",
          },
          {
            name: "choiceIds",
            type: {
              vec: "u64",
            },
          },
          {
            name: "fairLaunchStart",
            type: "i64",
          },
          {
            name: "fairLaunchEnd",
            type: "i64",
          },
          {
            name: "tradingStart",
            type: "i64",
          },
          {
            name: "tradingEnd",
            type: "i64",
          },
          {
            name: "initPot",
            type: "u128",
          },
        ],
      },
    },
    {
      name: "SubMarket",
      type: {
        kind: "struct",
        fields: [
          {
            name: "id",
            type: "u64",
          },
          {
            name: "invariant",
            type: "u128",
          },
          {
            name: "choices",
            type: {
              vec: {
                defined: "ChoiceMarket",
              },
            },
          },
          {
            name: "fairLaunchStart",
            type: "i64",
          },
          {
            name: "fairLaunchEnd",
            type: "i64",
          },
          {
            name: "tradingStart",
            type: "i64",
          },
          {
            name: "tradingEnd",
            type: "i64",
          },
          {
            name: "resolved",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "MarketStatus",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Initializing",
          },
          {
            name: "FairLaunch",
          },
          {
            name: "Trading",
          },
          {
            name: "Closed",
          },
        ],
      },
    },
  ],
  events: [
    {
      name: "FairLaunchOrderEvent",
      fields: [
        {
          name: "orderId",
          type: "u64",
          index: false,
        },
        {
          name: "totalAmount",
          type: "u128",
          index: false,
        },
        {
          name: "shares",
          type: "u128",
          index: false,
        },
        {
          name: "avgSharePrice",
          type: "f64",
          index: false,
        },
        {
          name: "fees",
          type: "u128",
          index: false,
        },
      ],
    },
    {
      name: "OrderEvent",
      fields: [
        {
          name: "orderId",
          type: "u64",
          index: false,
        },
        {
          name: "totalAmount",
          type: "u128",
          index: false,
        },
        {
          name: "shares",
          type: "u128",
          index: false,
        },
        {
          name: "avgSharePrice",
          type: "f64",
          index: false,
        },
        {
          name: "fees",
          type: "u128",
          index: false,
        },
      ],
    },
    {
      name: "BalanceEvent",
      fields: [
        {
          name: "userId",
          type: "u64",
          index: false,
        },
        {
          name: "unreedemableBalance",
          type: "u128",
          index: false,
        },
        {
          name: "usdcBalance",
          type: "u128",
          index: false,
        },
      ],
    },
    {
      name: "MarketAdjustEvent",
      fields: [
        {
          name: "choiceId",
          type: "u64",
          index: false,
        },
        {
          name: "newChoicePot",
          type: "u128",
          index: false,
        },
        {
          name: "newMintedShares",
          type: "u128",
          index: false,
        },
        {
          name: "newChoiceShares",
          type: "u128",
          index: false,
        },
        {
          name: "otherChoiceId",
          type: "u64",
          index: false,
        },
        {
          name: "newOtherChoiceShares",
          type: "u128",
          index: false,
        },
      ],
    },
    {
      name: "PortfolioEvent",
      fields: [
        {
          name: "choiceId",
          type: "u64",
          index: false,
        },
        {
          name: "userId",
          type: "u64",
          index: false,
        },
        {
          name: "sharesOwned",
          type: "u128",
          index: false,
        },
        {
          name: "buyValue",
          type: "u128",
          index: false,
        },
        {
          name: "sellValue",
          type: "u128",
          index: false,
        },
        {
          name: "sharesBought",
          type: "u128",
          index: false,
        },
        {
          name: "sharesSold",
          type: "u128",
          index: false,
        },
        {
          name: "isFairLaunch",
          type: "bool",
          index: false,
        },
        {
          name: "claimed",
          type: "bool",
          index: false,
        },
      ],
    },
    {
      name: "FairLaunchMarketEvent",
      fields: [
        {
          name: "subMarketId",
          type: "u64",
          index: false,
        },
        {
          name: "newInvariant",
          type: "u128",
          index: false,
        },
        {
          name: "choiceId",
          type: "u64",
          index: false,
        },
        {
          name: "newChoicePot",
          type: "u128",
          index: false,
        },
        {
          name: "mintedShares",
          type: "u128",
          index: false,
        },
        {
          name: "newChoiceShares",
          type: "u128",
          index: false,
        },
        {
          name: "otherChoiceId",
          type: "u64",
          index: false,
        },
        {
          name: "newOtherChoiceShares",
          type: "u128",
          index: false,
        },
      ],
    },
    {
      name: "DepositEvent",
      fields: [
        {
          name: "depositId",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "WithdrawalEvent",
      fields: [
        {
          name: "withdrawId",
          type: "u64",
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "AmountToAddTooLow",
      msg: "Amount to add can't be less than 0.",
    },
    {
      code: 6001,
      name: "AmountToWithdrawTooLow",
      msg: "Amount to withdraw can't be less than 0.",
    },
    {
      code: 6002,
      name: "AmountToWithdrawTooGreat",
      msg: "Amount to withdraw can't be greater than balance.",
    },
    {
      code: 6003,
      name: "NotAuthorized",
      msg: "You do not have the authorization to use this instruction.",
    },
    {
      code: 6004,
      name: "SubMarketNotFound",
      msg: "Sub market not found.",
    },
    {
      code: 6005,
      name: "ChoiceNotFound",
      msg: "Choice not found.",
    },
    {
      code: 6006,
      name: "ChoicePortfolioNotFound",
      msg: "Choice portfolio not found, please buy some shares first.",
    },
    {
      code: 6007,
      name: "BalanceTooLow",
      msg: "Not enough balance to make order.",
    },
    {
      code: 6008,
      name: "MarketIntializing",
      msg: "Market is still intializing, please try again later.",
    },
    {
      code: 6009,
      name: "MarketClosed",
      msg: "Market is closed, please check the results.",
    },
    {
      code: 6010,
      name: "MarketNotResolved",
      msg: "Market is not resolved yet, check back later.",
    },
    {
      code: 6011,
      name: "NotWinningChoice",
      msg: "This is not a winning choice.",
    },
    {
      code: 6012,
      name: "NotSellingPeriod",
      msg: "Cannot sell at this time please check in when trading starts.",
    },
    {
      code: 6013,
      name: "NotBuyingPeriod",
      msg: "Cannot buy at this time please check in when its Fair Launch or Trading.",
    },
    {
      code: 6014,
      name: "NotEnoughSharesToSell",
      msg: "Requested shares to sell greater than owned shares.",
    },
    {
      code: 6015,
      name: "SubMarketPortfolioNotFound",
      msg: "Sub market portfolio not found, please buy some shares first.",
    },
    {
      code: 6016,
      name: "BulkOrderTooBig",
      msg: "Bulk order too big.",
    },
    {
      code: 6017,
      name: "SameSubMarket",
      msg: "Order cannot contain multiple multiples of the same sub market.",
    },
    {
      code: 6018,
      name: "AlreadyClaimed",
      msg: "You have already claimed this winnings.",
    },
    {
      code: 6019,
      name: "MarketAlreadyResolved",
      msg: "Market already resolved.",
    },
    {
      code: 6020,
      name: "SharesEstimationOff",
      msg: "Estimated shares is to far off from acutal shares, cancelling order.",
    },
    {
      code: 6021,
      name: "PriceEstimationOff",
      msg: "Requested price is to far off from acutal price, cancelling order.",
    },
    {
      code: 6022,
      name: "NotUSDC",
      msg: "Can only withdraw usdc.",
    },
    {
      code: 6023,
      name: "NotAValidOrder",
      msg: "Not a valid order",
    },
    {
      code: 6024,
      name: "SharesNotEqual",
      msg: "Shares not equal",
    },
  ],
};
