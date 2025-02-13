export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      _market_categories: {
        Row: {
          category: string;
          created_at: string;
          prediction_market_id: number;
        };
        Insert: {
          category: string;
          created_at?: string;
          prediction_market_id: number;
        };
        Update: {
          category?: string;
          created_at?: string;
          prediction_market_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "_market_categories_category_fkey";
            columns: ["category"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["name"];
          },
          {
            foreignKeyName: "_market_categories_prediction_market_id_fkey";
            columns: ["prediction_market_id"];
            isOneToOne: false;
            referencedRelation: "prediction_markets";
            referencedColumns: ["id"];
          },
        ];
      };
      blogs: {
        Row: {
          body: string;
          created_at: string;
          id: number;
          image: string;
          title: string;
          title_query: string;
        };
        Insert: {
          body: string;
          created_at?: string;
          id?: number;
          image: string;
          title: string;
          title_query: string;
        };
        Update: {
          body?: string;
          created_at?: string;
          id?: number;
          image?: string;
          title?: string;
          title_query?: string;
        };
        Relationships: [];
      };
      calendar_events: {
        Row: {
          created_at: string;
          date: string;
          description: string;
          id: number;
          is_important: boolean;
          link: string;
          title: string;
          type: string;
        };
        Insert: {
          created_at?: string;
          date?: string;
          description: string;
          id?: number;
          is_important?: boolean;
          link: string;
          title: string;
          type?: string;
        };
        Update: {
          created_at?: string;
          date?: string;
          description?: string;
          id?: number;
          is_important?: boolean;
          link?: string;
          title?: string;
          type?: string;
        };
        Relationships: [];
      };
      calendars: {
        Row: {
          created_at: string;
          description: string;
          id: number;
          "last updated": string;
          link: string;
          slug: string;
          title: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          id?: number;
          "last updated"?: string;
          link: string;
          slug: string;
          title: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: number;
          "last updated"?: string;
          link?: string;
          slug?: string;
          title?: string;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          collection: string | null;
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          collection?: string | null;
          created_at?: string;
          id?: number;
          name: string;
        };
        Update: {
          collection?: string | null;
          created_at?: string;
          id?: number;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "categories_collection_fkey";
            columns: ["collection"];
            isOneToOne: false;
            referencedRelation: "collections";
            referencedColumns: ["name"];
          },
        ];
      };
      choice_markets: {
        Row: {
          color: Database["public"]["Enums"]["colors_enum"] | null;
          created_at: string;
          icon: string | null;
          id: number;
          is_winner: boolean | null;
          order: number | null;
          share_price: number;
          shares: number;
          shares_in_mm: number;
          sub_market_id: number;
          title: string;
          total_pot: number;
        };
        Insert: {
          color?: Database["public"]["Enums"]["colors_enum"] | null;
          created_at?: string;
          icon?: string | null;
          id?: number;
          is_winner?: boolean | null;
          order?: number | null;
          share_price?: number;
          shares?: number;
          shares_in_mm?: number;
          sub_market_id: number;
          title: string;
          total_pot?: number;
        };
        Update: {
          color?: Database["public"]["Enums"]["colors_enum"] | null;
          created_at?: string;
          icon?: string | null;
          id?: number;
          is_winner?: boolean | null;
          order?: number | null;
          share_price?: number;
          shares?: number;
          shares_in_mm?: number;
          sub_market_id?: number;
          title?: string;
          total_pot?: number;
        };
        Relationships: [
          {
            foreignKeyName: "choice_markets_sub_market_id_fkey";
            columns: ["sub_market_id"];
            isOneToOne: false;
            referencedRelation: "sub_markets";
            referencedColumns: ["id"];
          },
        ];
      };
      collections: {
        Row: {
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      deposits: {
        Row: {
          balance_id: number;
          created_at: string;
          id: number;
          new_usdc_balance: number;
          status: Database["public"]["Enums"]["order_status"];
          usdc_amount_received: number;
          user_id: number;
        };
        Insert: {
          balance_id: number;
          created_at?: string;
          id?: number;
          new_usdc_balance: number;
          status: Database["public"]["Enums"]["order_status"];
          usdc_amount_received: number;
          user_id: number;
        };
        Update: {
          balance_id?: number;
          created_at?: string;
          id?: number;
          new_usdc_balance?: number;
          status?: Database["public"]["Enums"]["order_status"];
          usdc_amount_received?: number;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "deposits_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_deposits_balance_id_fkey";
            columns: ["balance_id"];
            isOneToOne: false;
            referencedRelation: "user_balances";
            referencedColumns: ["id"];
          },
        ];
      };
      fair_launch_order: {
        Row: {
          avg_share_price: number;
          choice_market_id: number;
          created_at: string;
          fees: number;
          id: number;
          shares: number;
          status: Database["public"]["Enums"]["trade_status"];
          total_amount: number;
          user_id: number;
        };
        Insert: {
          avg_share_price: number;
          choice_market_id: number;
          created_at?: string;
          fees?: number;
          id?: number;
          shares: number;
          status?: Database["public"]["Enums"]["trade_status"];
          total_amount?: number;
          user_id: number;
        };
        Update: {
          avg_share_price?: number;
          choice_market_id?: number;
          created_at?: string;
          fees?: number;
          id?: number;
          shares?: number;
          status?: Database["public"]["Enums"]["trade_status"];
          total_amount?: number;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "fair_launch_order_choice_market_id_fkey";
            columns: ["choice_market_id"];
            isOneToOne: false;
            referencedRelation: "choice_markets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fair_launch_order_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      holdings: {
        Row: {
          choice_market_id: number;
          claimed: boolean;
          created_at: string;
          fair_launch_shares: number;
          id: number;
          shares: number;
          shares_bought: number;
          shares_sold: number;
          total_buy_value: number;
          total_sell_value: number;
          user_id: number;
        };
        Insert: {
          choice_market_id: number;
          claimed?: boolean;
          created_at?: string;
          fair_launch_shares?: number;
          id?: number;
          shares?: number;
          shares_bought?: number;
          shares_sold?: number;
          total_buy_value?: number;
          total_sell_value?: number;
          user_id: number;
        };
        Update: {
          choice_market_id?: number;
          claimed?: boolean;
          created_at?: string;
          fair_launch_shares?: number;
          id?: number;
          shares?: number;
          shares_bought?: number;
          shares_sold?: number;
          total_buy_value?: number;
          total_sell_value?: number;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "holdings_choice_market_id_fkey";
            columns: ["choice_market_id"];
            isOneToOne: false;
            referencedRelation: "choice_markets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "holdings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      landing_banners: {
        Row: {
          active: boolean;
          banner: string;
          created_at: string;
          description: string | null;
          id: number;
          is_outgoing: boolean;
          link: string;
          title: string;
        };
        Insert: {
          active?: boolean;
          banner: string;
          created_at?: string;
          description?: string | null;
          id?: number;
          is_outgoing: boolean;
          link: string;
          title: string;
        };
        Update: {
          active?: boolean;
          banner?: string;
          created_at?: string;
          description?: string | null;
          id?: number;
          is_outgoing?: boolean;
          link?: string;
          title?: string;
        };
        Relationships: [];
      };
      leaderboard_all: {
        Row: {
          conviction: number;
          created_at: string;
          id: number;
          image: string;
          points: number;
          profits: number;
          username: string;
          volume: number;
        };
        Insert: {
          conviction?: number;
          created_at?: string;
          id?: number;
          image?: string;
          points?: number;
          profits?: number;
          username: string;
          volume?: number;
        };
        Update: {
          conviction?: number;
          created_at?: string;
          id?: number;
          image?: string;
          points?: number;
          profits?: number;
          username?: string;
          volume?: number;
        };
        Relationships: [];
      };
      leaderboard_daily: {
        Row: {
          conviction: number;
          created_at: string;
          id: number;
          image: string;
          points: number;
          profits: number;
          username: string;
          volume: number;
        };
        Insert: {
          conviction?: number;
          created_at?: string;
          id?: number;
          image?: string;
          points?: number;
          profits?: number;
          username: string;
          volume?: number;
        };
        Update: {
          conviction?: number;
          created_at?: string;
          id?: number;
          image?: string;
          points?: number;
          profits?: number;
          username?: string;
          volume?: number;
        };
        Relationships: [];
      };
      leaderboard_monthly: {
        Row: {
          conviction: number;
          created_at: string;
          id: number;
          image: string;
          points: number;
          profits: number;
          username: string;
          volume: number;
        };
        Insert: {
          conviction?: number;
          created_at?: string;
          id?: number;
          image?: string;
          points?: number;
          profits?: number;
          username: string;
          volume?: number;
        };
        Update: {
          conviction?: number;
          created_at?: string;
          id?: number;
          image?: string;
          points?: number;
          profits?: number;
          username?: string;
          volume?: number;
        };
        Relationships: [];
      };
      leaderboard_weekly: {
        Row: {
          conviction: number;
          created_at: string;
          id: number;
          image: string;
          points: number;
          profits: number;
          username: string;
          volume: number;
        };
        Insert: {
          conviction?: number;
          created_at?: string;
          id?: number;
          image?: string;
          points?: number;
          profits?: number;
          username: string;
          volume?: number;
        };
        Update: {
          conviction?: number;
          created_at?: string;
          id?: number;
          image?: string;
          points?: number;
          profits?: number;
          username?: string;
          volume?: number;
        };
        Relationships: [];
      };
      limit_buy_order: {
        Row: {
          asking_price: number;
          choice_market_id: number;
          created_at: string;
          id: number;
          is_fufilled: boolean;
          outgoing_usdc: number;
          user_id: number;
        };
        Insert: {
          asking_price: number;
          choice_market_id: number;
          created_at?: string;
          id?: number;
          is_fufilled?: boolean;
          outgoing_usdc: number;
          user_id: number;
        };
        Update: {
          asking_price?: number;
          choice_market_id?: number;
          created_at?: string;
          id?: number;
          is_fufilled?: boolean;
          outgoing_usdc?: number;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "limit_buy_order_choice_market_id_fkey";
            columns: ["choice_market_id"];
            isOneToOne: false;
            referencedRelation: "choice_markets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "limit_buy_order_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      limit_sell_order: {
        Row: {
          asking_price: number;
          choice_market_id: number;
          created_at: string;
          id: number;
          incoming_usdc: number;
          user_id: number;
        };
        Insert: {
          asking_price: number;
          choice_market_id: number;
          created_at?: string;
          id?: number;
          incoming_usdc: number;
          user_id: number;
        };
        Update: {
          asking_price?: number;
          choice_market_id?: number;
          created_at?: string;
          id?: number;
          incoming_usdc?: number;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "limit_sell_order_choice_market_id_fkey";
            columns: ["choice_market_id"];
            isOneToOne: false;
            referencedRelation: "choice_markets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "limit_sell_order_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      market_banners: {
        Row: {
          active: boolean;
          banner: string;
          created_at: string;
          description: string | null;
          id: number;
          link: string;
          title: string;
        };
        Insert: {
          active?: boolean;
          banner: string;
          created_at?: string;
          description?: string | null;
          id?: number;
          link: string;
          title: string;
        };
        Update: {
          active?: boolean;
          banner?: string;
          created_at?: string;
          description?: string | null;
          id?: number;
          link?: string;
          title?: string;
        };
        Relationships: [];
      };
      market_tickers: {
        Row: {
          active: boolean;
          choice: string;
          choice_market_id: number;
          created_at: string;
          direction: string | null;
          id: number;
          share_price: number;
        };
        Insert: {
          active?: boolean;
          choice: string;
          choice_market_id: number;
          created_at?: string;
          direction?: string | null;
          id?: number;
          share_price?: number;
        };
        Update: {
          active?: boolean;
          choice?: string;
          choice_market_id?: number;
          created_at?: string;
          direction?: string | null;
          id?: number;
          share_price?: number;
        };
        Relationships: [
          {
            foreignKeyName: "market_tickers_choice_market_id_fkey";
            columns: ["choice_market_id"];
            isOneToOne: false;
            referencedRelation: "choice_markets";
            referencedColumns: ["id"];
          },
        ];
      };
      orders: {
        Row: {
          avg_share_price: number | null;
          choice_market_id: number;
          created_at: string;
          fees: number;
          id: number;
          shares: number | null;
          status: Database["public"]["Enums"]["trade_status"];
          total_amount: number | null;
          trade_side: Database["public"]["Enums"]["trade_side"];
          user_id: number;
        };
        Insert: {
          avg_share_price?: number | null;
          choice_market_id: number;
          created_at?: string;
          fees?: number;
          id?: number;
          shares?: number | null;
          status?: Database["public"]["Enums"]["trade_status"];
          total_amount?: number | null;
          trade_side: Database["public"]["Enums"]["trade_side"];
          user_id: number;
        };
        Update: {
          avg_share_price?: number | null;
          choice_market_id?: number;
          created_at?: string;
          fees?: number;
          id?: number;
          shares?: number | null;
          status?: Database["public"]["Enums"]["trade_status"];
          total_amount?: number | null;
          trade_side?: Database["public"]["Enums"]["trade_side"];
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "public_orders_choice_market_id_fkey";
            columns: ["choice_market_id"];
            isOneToOne: false;
            referencedRelation: "choice_markets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_orders_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      payouts: {
        Row: {
          choice_market_id: number;
          created_at: string;
          id: number;
          new_usdc_balance: number;
          sub_market_id: number;
          usdc_amount: number;
          user_id: number;
          wallet_id: number;
        };
        Insert: {
          choice_market_id: number;
          created_at?: string;
          id?: number;
          new_usdc_balance: number;
          sub_market_id: number;
          usdc_amount: number;
          user_id: number;
          wallet_id: number;
        };
        Update: {
          choice_market_id?: number;
          created_at?: string;
          id?: number;
          new_usdc_balance?: number;
          sub_market_id?: number;
          usdc_amount?: number;
          user_id?: number;
          wallet_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "payout_choice_market_id_fkey";
            columns: ["choice_market_id"];
            isOneToOne: false;
            referencedRelation: "choice_markets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "payout_sub_market_id_fkey";
            columns: ["sub_market_id"];
            isOneToOne: false;
            referencedRelation: "sub_markets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "payout_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "payout_wallet_id_fkey";
            columns: ["wallet_id"];
            isOneToOne: false;
            referencedRelation: "user_balances";
            referencedColumns: ["id"];
          },
        ];
      };
      prediction_markets: {
        Row: {
          banner: string;
          category: string | null;
          created_at: string;
          end_time: string;
          icon: string;
          id: number;
          public_key: string | null;
          slug: string;
          start_time: string;
          thumbnail: string;
          title: string;
          total_comments: number;
          total_pot: number;
          trading_end: string | null;
        };
        Insert: {
          banner: string;
          category?: string | null;
          created_at?: string;
          end_time: string;
          icon: string;
          id?: number;
          public_key?: string | null;
          slug: string;
          start_time: string;
          thumbnail: string;
          title: string;
          total_comments?: number;
          total_pot?: number;
          trading_end?: string | null;
        };
        Update: {
          banner?: string;
          category?: string | null;
          created_at?: string;
          end_time?: string;
          icon?: string;
          id?: number;
          public_key?: string | null;
          slug?: string;
          start_time?: string;
          thumbnail?: string;
          title?: string;
          total_comments?: number;
          total_pot?: number;
          trading_end?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "prediction_markets_category_fkey";
            columns: ["category"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["name"];
          },
        ];
      };
      price_histories: {
        Row: {
          choice_market_id: number;
          created_at: string;
          id: number;
          price: number;
        };
        Insert: {
          choice_market_id: number;
          created_at?: string;
          id?: number;
          price: number;
        };
        Update: {
          choice_market_id?: number;
          created_at?: string;
          id?: number;
          price?: number;
        };
        Relationships: [
          {
            foreignKeyName: "public_price_histories_choice_market_id_fkey";
            columns: ["choice_market_id"];
            isOneToOne: false;
            referencedRelation: "choice_markets";
            referencedColumns: ["id"];
          },
        ];
      };
      rewards: {
        Row: {
          created_at: string;
          description: string;
          id: number;
          image: string;
          name: string;
          points_required: number;
        };
        Insert: {
          created_at?: string;
          description: string;
          id?: number;
          image: string;
          name: string;
          points_required: number;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: number;
          image?: string;
          name?: string;
          points_required?: number;
        };
        Relationships: [];
      };
      rewards_redeems: {
        Row: {
          created_at: string;
          id: number;
          new_point_total: number;
          reward_id: number;
          user_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          new_point_total: number;
          reward_id: number;
          user_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          new_point_total?: number;
          reward_id?: number;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "rewards_redeems_reward_id_fkey";
            columns: ["reward_id"];
            isOneToOne: false;
            referencedRelation: "rewards";
            referencedColumns: ["id"];
          },
        ];
      };
      sub_markets: {
        Row: {
          banner: string;
          card_title: string | null;
          color: Database["public"]["Enums"]["colors_enum"] | null;
          created_at: string;
          fair_launch_end: string;
          fair_launch_start: string;
          has_resolved: boolean;
          icon: string;
          id: number;
          init_pot: number;
          invariant: number;
          order: number | null;
          prediction_market_id: number;
          slug: string;
          start_time: string;
          thumbnail: string;
          title: string;
          total_pot: number;
          trading_end: string;
          trading_start: string;
        };
        Insert: {
          banner: string;
          card_title?: string | null;
          color?: Database["public"]["Enums"]["colors_enum"] | null;
          created_at?: string;
          fair_launch_end: string;
          fair_launch_start: string;
          has_resolved?: boolean;
          icon: string;
          id?: number;
          init_pot?: number;
          invariant?: number;
          order?: number | null;
          prediction_market_id: number;
          slug: string;
          start_time?: string;
          thumbnail: string;
          title: string;
          total_pot?: number;
          trading_end: string;
          trading_start: string;
        };
        Update: {
          banner?: string;
          card_title?: string | null;
          color?: Database["public"]["Enums"]["colors_enum"] | null;
          created_at?: string;
          fair_launch_end?: string;
          fair_launch_start?: string;
          has_resolved?: boolean;
          icon?: string;
          id?: number;
          init_pot?: number;
          invariant?: number;
          order?: number | null;
          prediction_market_id?: number;
          slug?: string;
          start_time?: string;
          thumbnail?: string;
          title?: string;
          total_pot?: number;
          trading_end?: string;
          trading_start?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sub_markets_prediction_market_id_fkey";
            columns: ["prediction_market_id"];
            isOneToOne: false;
            referencedRelation: "prediction_markets";
            referencedColumns: ["id"];
          },
        ];
      };
      test_trigger: {
        Row: {
          choice_market_id: number;
          created_at: string;
          id: number;
          total_pot: number;
        };
        Insert: {
          choice_market_id: number;
          created_at?: string;
          id?: number;
          total_pot: number;
        };
        Update: {
          choice_market_id?: number;
          created_at?: string;
          id?: number;
          total_pot?: number;
        };
        Relationships: [];
      };
      user_balances: {
        Row: {
          created_at: string;
          has_first_deposit: boolean;
          id: number;
          pda_key: string;
          public_key: string;
          unredeemable_balance: number;
          usdc_balance: number;
          user_id: number;
        };
        Insert: {
          created_at?: string;
          has_first_deposit?: boolean;
          id?: number;
          pda_key?: string;
          public_key: string;
          unredeemable_balance?: number;
          usdc_balance?: number;
          user_id: number;
        };
        Update: {
          created_at?: string;
          has_first_deposit?: boolean;
          id?: number;
          pda_key?: string;
          public_key?: string;
          unredeemable_balance?: number;
          usdc_balance?: number;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "proxy_wallets_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      user_referrals: {
        Row: {
          created_at: string;
          deposit_fufilled: boolean;
          id: number;
          referred_id: number;
          referrer_id: number;
        };
        Insert: {
          created_at?: string;
          deposit_fufilled?: boolean;
          id?: number;
          referred_id: number;
          referrer_id: number;
        };
        Update: {
          created_at?: string;
          deposit_fufilled?: boolean;
          id?: number;
          referred_id?: number;
          referrer_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "user_referrals_referred_id_fkey";
            columns: ["referred_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_referrals_referrer_id_fkey";
            columns: ["referrer_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          conviction: number;
          created_at: string;
          icon: string | null;
          id: number;
          name: string;
          reward_points: number;
          user_id: string;
        };
        Insert: {
          conviction?: number;
          created_at?: string;
          icon?: string | null;
          id?: number;
          name: string;
          reward_points?: number;
          user_id: string;
        };
        Update: {
          conviction?: number;
          created_at?: string;
          icon?: string | null;
          id?: number;
          name?: string;
          reward_points?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      withdraws: {
        Row: {
          created_at: string;
          fees: number;
          id: number;
          new_usdc_balance: number;
          status: Database["public"]["Enums"]["order_status"];
          usdc_amount_withdrawn: number;
          user_id: number;
          wallet_id: number;
          withdrawal_wallet: string;
        };
        Insert: {
          created_at?: string;
          fees: number;
          id?: number;
          new_usdc_balance: number;
          status: Database["public"]["Enums"]["order_status"];
          usdc_amount_withdrawn: number;
          user_id: number;
          wallet_id: number;
          withdrawal_wallet: string;
        };
        Update: {
          created_at?: string;
          fees?: number;
          id?: number;
          new_usdc_balance?: number;
          status?: Database["public"]["Enums"]["order_status"];
          usdc_amount_withdrawn?: number;
          user_id?: number;
          wallet_id?: number;
          withdrawal_wallet?: string;
        };
        Relationships: [
          {
            foreignKeyName: "withdraws_wallet_id_fkey";
            columns: ["wallet_id"];
            isOneToOne: false;
            referencedRelation: "user_balances";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_price_chart: {
        Args: {
          choice_market_ids: number[];
          date_interval: string;
        };
        Returns: {
          id: number;
          created_at: string;
          choice_market_id: number;
          price: number;
          title: string;
          card_title: string;
          color: Database["public"]["Enums"]["colors_enum"];
        }[];
      };
      handle_prediction_market_search: {
        Args: {
          search: string;
        };
        Returns: Record<string, unknown>;
      };
      is_admin: {
        Args: {
          user_id: string;
        };
        Returns: boolean;
      };
      is_owner: {
        Args: {
          auth_uid: string;
          user_doc_id: number;
        };
        Returns: boolean;
      };
      rank_users_by_volume: {
        Args: Record<PropertyKey, never>;
        Returns: {
          user_id: number;
          total_volume: number;
          rank: number;
        }[];
      };
    };
    Enums: {
      colors_enum:
        | "red"
        | "orange"
        | "yellow"
        | "green"
        | "blue"
        | "purple"
        | "indigo"
        | "gray"
        | "white"
        | "primary";
      order_side: "BUY" | "SELL";
      order_status: "PENDING" | "APPROVED" | "CONFIRMED";
      order_type: "FOK" | "GTC" | "GTD";
      trade_side: "BUY" | "SELL";
      trade_status:
        | "MATCHED"
        | "MINED"
        | "CONFIRMED"
        | "RETRYING"
        | "FAILED"
        | "PENDING"
        | "ESTIMATE";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
