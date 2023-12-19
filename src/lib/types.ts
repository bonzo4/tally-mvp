export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          body: string
          created_at: string
          id: number
          image: string
          title: string
          title_query: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: number
          image: string
          title: string
          title_query: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: number
          image?: string
          title?: string
          title_query?: string
        }
        Relationships: []
      }
      buy_orders: {
        Row: {
          avg_share_price: number
          choice_market_id: number | null
          created_at: string
          id: number
          incoming_usdc: number
          new_usdc_balance: number
          shares_gained: number
          user_id: number | null
        }
        Insert: {
          avg_share_price: number
          choice_market_id?: number | null
          created_at?: string
          id?: number
          incoming_usdc: number
          new_usdc_balance: number
          shares_gained: number
          user_id?: number | null
        }
        Update: {
          avg_share_price?: number
          choice_market_id?: number | null
          created_at?: string
          id?: number
          incoming_usdc?: number
          new_usdc_balance?: number
          shares_gained?: number
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "buy_orders_choice_market_id_fkey"
            columns: ["choice_market_id"]
            isOneToOne: false
            referencedRelation: "choice_markets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "buy_orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      categories: {
        Row: {
          collection: string
          created_at: string
          id: number
          name: string
        }
        Insert: {
          collection: string
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          collection?: string
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_collection_fkey"
            columns: ["collection"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["name"]
          }
        ]
      }
      choice_markets: {
        Row: {
          choice: string
          created_at: string
          id: number
          lp_amount: number
          share_price: number
          sub_market_id: number
        }
        Insert: {
          choice: string
          created_at?: string
          id?: number
          lp_amount?: number
          share_price?: number
          sub_market_id: number
        }
        Update: {
          choice?: string
          created_at?: string
          id?: number
          lp_amount?: number
          share_price?: number
          sub_market_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "choice_markets_sub_market_id_fkey"
            columns: ["sub_market_id"]
            isOneToOne: false
            referencedRelation: "sub_markets"
            referencedColumns: ["id"]
          }
        ]
      }
      collections: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      deposits: {
        Row: {
          created_at: string
          id: number
          new_usdc_balance: number
          payment_type: string
          usdc_amount_received: number
          user_id: number
          wallet_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          new_usdc_balance: number
          payment_type: string
          usdc_amount_received: number
          user_id: number
          wallet_id: number
        }
        Update: {
          created_at?: string
          id?: number
          new_usdc_balance?: number
          payment_type?: string
          usdc_amount_received?: number
          user_id?: number
          wallet_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "deposits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deposits_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "proxy_wallet"
            referencedColumns: ["id"]
          }
        ]
      }
      fair_launch_order: {
        Row: {
          choice_market_id: number
          created_at: string
          id: number
          incoming_usdc: number
          new_usdc_balance: number
          total_shares_gained: number
          user_id: number
        }
        Insert: {
          choice_market_id: number
          created_at?: string
          id?: number
          incoming_usdc: number
          new_usdc_balance: number
          total_shares_gained: number
          user_id: number
        }
        Update: {
          choice_market_id?: number
          created_at?: string
          id?: number
          incoming_usdc?: number
          new_usdc_balance?: number
          total_shares_gained?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fair_launch_order_choice_market_id_fkey"
            columns: ["choice_market_id"]
            isOneToOne: false
            referencedRelation: "choice_markets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fair_launch_order_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      landing_banners: {
        Row: {
          active: boolean
          banner: string
          created_at: string
          description: string | null
          id: number
          is_outgoing: boolean
          link: string
          title: string
        }
        Insert: {
          active?: boolean
          banner: string
          created_at?: string
          description?: string | null
          id?: number
          is_outgoing: boolean
          link: string
          title: string
        }
        Update: {
          active?: boolean
          banner?: string
          created_at?: string
          description?: string | null
          id?: number
          is_outgoing?: boolean
          link?: string
          title?: string
        }
        Relationships: []
      }
      limit_buy_order: {
        Row: {
          asking_price: number
          choice_market_id: number
          created_at: string
          id: number
          outgoing_usdc: number
          user_id: number
        }
        Insert: {
          asking_price: number
          choice_market_id: number
          created_at?: string
          id?: number
          outgoing_usdc: number
          user_id: number
        }
        Update: {
          asking_price?: number
          choice_market_id?: number
          created_at?: string
          id?: number
          outgoing_usdc?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "limit_buy_order_choice_market_id_fkey"
            columns: ["choice_market_id"]
            isOneToOne: false
            referencedRelation: "choice_markets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "limit_buy_order_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      limit_sell_order: {
        Row: {
          asking_price: number
          choice_market_id: number
          created_at: string
          id: number
          incoming_usdc: number
          user_id: number
        }
        Insert: {
          asking_price: number
          choice_market_id: number
          created_at?: string
          id?: number
          incoming_usdc: number
          user_id: number
        }
        Update: {
          asking_price?: number
          choice_market_id?: number
          created_at?: string
          id?: number
          incoming_usdc?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "limit_sell_order_choice_market_id_fkey"
            columns: ["choice_market_id"]
            isOneToOne: false
            referencedRelation: "choice_markets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "limit_sell_order_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      market_banners: {
        Row: {
          active: boolean
          banner: string
          created_at: string
          description: string | null
          id: number
          link: string
          title: string
        }
        Insert: {
          active?: boolean
          banner: string
          created_at?: string
          description?: string | null
          id?: number
          link: string
          title: string
        }
        Update: {
          active?: boolean
          banner?: string
          created_at?: string
          description?: string | null
          id?: number
          link?: string
          title?: string
        }
        Relationships: []
      }
      market_tickers: {
        Row: {
          active: boolean
          choice: string
          choice_market_id: number
          created_at: string
          direction: string | null
          id: number
          share_price: number
        }
        Insert: {
          active?: boolean
          choice: string
          choice_market_id: number
          created_at?: string
          direction?: string | null
          id?: number
          share_price?: number
        }
        Update: {
          active?: boolean
          choice?: string
          choice_market_id?: number
          created_at?: string
          direction?: string | null
          id?: number
          share_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "market_tickers_choice_market_id_fkey"
            columns: ["choice_market_id"]
            isOneToOne: false
            referencedRelation: "choice_markets"
            referencedColumns: ["id"]
          }
        ]
      }
      owned_shares: {
        Row: {
          avg_share_price: number
          choice_market_id: number
          created_at: string
          id: number
          share_amount: number
          user_id: number
        }
        Insert: {
          avg_share_price: number
          choice_market_id: number
          created_at?: string
          id?: number
          share_amount: number
          user_id: number
        }
        Update: {
          avg_share_price?: number
          choice_market_id?: number
          created_at?: string
          id?: number
          share_amount?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "owned_shares_choice_market_id_fkey"
            columns: ["choice_market_id"]
            isOneToOne: false
            referencedRelation: "choice_markets"
            referencedColumns: ["id"]
          }
        ]
      }
      payout: {
        Row: {
          choice_market_id: number
          created_at: string
          id: number
          new_usdc_balance: number
          sub_market_id: number
          usdc_outgoing: number
          user_id: number
          wallet_id: number
        }
        Insert: {
          choice_market_id: number
          created_at?: string
          id?: number
          new_usdc_balance: number
          sub_market_id: number
          usdc_outgoing: number
          user_id: number
          wallet_id: number
        }
        Update: {
          choice_market_id?: number
          created_at?: string
          id?: number
          new_usdc_balance?: number
          sub_market_id?: number
          usdc_outgoing?: number
          user_id?: number
          wallet_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "payout_choice_market_id_fkey"
            columns: ["choice_market_id"]
            isOneToOne: false
            referencedRelation: "choice_markets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payout_sub_market_id_fkey"
            columns: ["sub_market_id"]
            isOneToOne: false
            referencedRelation: "sub_markets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payout_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payout_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "proxy_wallet"
            referencedColumns: ["id"]
          }
        ]
      }
      prediction_markets: {
        Row: {
          category: string | null
          created_at: string
          end_time: string
          id: number
          image: string
          question: string
          start_time: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          end_time: string
          id?: number
          image: string
          question: string
          start_time: string
        }
        Update: {
          category?: string | null
          created_at?: string
          end_time?: string
          id?: number
          image?: string
          question?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "prediction_markets_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["name"]
          }
        ]
      }
      proxy_wallet: {
        Row: {
          created_at: string
          encrypted_private_key: string
          id: number
          public_key: string
          unredeemable_balance: number
          usdc_balance: number
        }
        Insert: {
          created_at?: string
          encrypted_private_key: string
          id?: number
          public_key: string
          unredeemable_balance?: number
          usdc_balance?: number
        }
        Update: {
          created_at?: string
          encrypted_private_key?: string
          id?: number
          public_key?: string
          unredeemable_balance?: number
          usdc_balance?: number
        }
        Relationships: []
      }
      rewards: {
        Row: {
          created_at: string
          description: string
          id: number
          image: string
          name: string
          points_required: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          image: string
          name: string
          points_required: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          image?: string
          name?: string
          points_required?: number
        }
        Relationships: []
      }
      rewards_redeems: {
        Row: {
          created_at: string
          id: number
          new_point_total: number
          reward_id: number
          user_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          new_point_total: number
          reward_id: number
          user_id: number
        }
        Update: {
          created_at?: string
          id?: number
          new_point_total?: number
          reward_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "rewards_redeems_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "rewards"
            referencedColumns: ["id"]
          }
        ]
      }
      sell_orders: {
        Row: {
          avg_share_price: number
          choice_market_id: number
          created_at: string
          id: number
          new_usdc_balance: number
          outgoing_usdc: number
          shares_lost: number
          user_id: number
        }
        Insert: {
          avg_share_price: number
          choice_market_id: number
          created_at?: string
          id?: number
          new_usdc_balance: number
          outgoing_usdc: number
          shares_lost: number
          user_id: number
        }
        Update: {
          avg_share_price?: number
          choice_market_id?: number
          created_at?: string
          id?: number
          new_usdc_balance?: number
          outgoing_usdc?: number
          shares_lost?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "sell_orders_choice_market_id_fkey"
            columns: ["choice_market_id"]
            isOneToOne: false
            referencedRelation: "choice_markets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sell_orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      sub_markets: {
        Row: {
          banner: string
          created_at: string
          description: string
          fair_launch_end: string
          fair_launch_start: string
          id: number
          image: string
          lp_amount: number
          prediction_market_id: number
          resolution_end: string
          resolution_start: string
          start_time: string
          title: string
          trading_end: string
          trading_start: string
          winning_choice_id: number | null
        }
        Insert: {
          banner: string
          created_at?: string
          description: string
          fair_launch_end: string
          fair_launch_start: string
          id?: number
          image: string
          lp_amount?: number
          prediction_market_id: number
          resolution_end: string
          resolution_start: string
          start_time?: string
          title: string
          trading_end: string
          trading_start: string
          winning_choice_id?: number | null
        }
        Update: {
          banner?: string
          created_at?: string
          description?: string
          fair_launch_end?: string
          fair_launch_start?: string
          id?: number
          image?: string
          lp_amount?: number
          prediction_market_id?: number
          resolution_end?: string
          resolution_start?: string
          start_time?: string
          title?: string
          trading_end?: string
          trading_start?: string
          winning_choice_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sub_markets_prediction_market_id_fkey"
            columns: ["prediction_market_id"]
            isOneToOne: false
            referencedRelation: "prediction_markets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sub_markets_winning_choice_id_fkey"
            columns: ["winning_choice_id"]
            isOneToOne: false
            referencedRelation: "choice_markets"
            referencedColumns: ["id"]
          }
        ]
      }
      user_referrals: {
        Row: {
          created_at: string
          deposit_fufilled: boolean
          id: number
          referred_id: number
          referrer_id: number
        }
        Insert: {
          created_at?: string
          deposit_fufilled?: boolean
          id?: number
          referred_id: number
          referrer_id: number
        }
        Update: {
          created_at?: string
          deposit_fufilled?: boolean
          id?: number
          referred_id?: number
          referrer_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_referrals_referred_id_fkey"
            columns: ["referred_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string
          icon: string | null
          id: number
          name: string
          reward_points: number
          user_id: string
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: number
          name: string
          reward_points?: number
          user_id: string
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: number
          name?: string
          reward_points?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      withdraws: {
        Row: {
          created_at: string
          id: number
          new_usdc_balance: number
          usdc_amount_withdrawn: number
          user_id: number
          wallet_id: number
          withdrawal_wallet: string
        }
        Insert: {
          created_at?: string
          id?: number
          new_usdc_balance: number
          usdc_amount_withdrawn: number
          user_id: number
          wallet_id: number
          withdrawal_wallet: string
        }
        Update: {
          created_at?: string
          id?: number
          new_usdc_balance?: number
          usdc_amount_withdrawn?: number
          user_id?: number
          wallet_id?: number
          withdrawal_wallet?: string
        }
        Relationships: [
          {
            foreignKeyName: "withdraws_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "proxy_wallet"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      handle_basic_market_search: {
        Args: {
          search: string
        }
        Returns: Record<string, unknown>
      }
      is_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      order_side: "BUY" | "SELL"
      order_status: "PENDING" | "APPROVED" | "CONFIRMED"
      order_type: "FOK" | "GTC" | "GTD"
      trade_side: "BUY" | "SELL"
      trade_status: "MATCHED" | "MINED" | "CONFIRMED" | "RETRYING" | "FAILED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
