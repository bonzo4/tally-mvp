export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
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
          }
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
      market_previews: {
        Row: {
          category: string | null;
          created_at: string;
          icon: string | null;
          id: number;
          no_price: number;
          question: string;
          yes_price: number;
        };
        Insert: {
          category?: string | null;
          created_at?: string;
          icon?: string | null;
          id?: number;
          no_price?: number;
          question: string;
          yes_price?: number;
        };
        Update: {
          category?: string | null;
          created_at?: string;
          icon?: string | null;
          id?: number;
          no_price?: number;
          question?: string;
          yes_price?: number;
        };
        Relationships: [
          {
            foreignKeyName: "market_previews_category_fkey";
            columns: ["category"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["name"];
          },
          {
            foreignKeyName: "market_previews_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "markets";
            referencedColumns: ["id"];
          }
        ];
      };
      markets: {
        Row: {
          active: boolean;
          category: string | null;
          closed: boolean;
          created_at: string;
          description: string;
          icon: string;
          id: number;
          question: string;
        };
        Insert: {
          active?: boolean;
          category?: string | null;
          closed?: boolean;
          created_at?: string;
          description: string;
          icon: string;
          id?: number;
          question: string;
        };
        Update: {
          active?: boolean;
          category?: string | null;
          closed?: boolean;
          created_at?: string;
          description?: string;
          icon?: string;
          id?: number;
          question?: string;
        };
        Relationships: [
          {
            foreignKeyName: "markets_category_fkey";
            columns: ["category"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["name"];
          }
        ];
      };
      users: {
        Row: {
          created_at: string;
          icon: string | null;
          id: number;
          name: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          icon?: string | null;
          id?: number;
          name: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          icon?: string | null;
          id?: number;
          name?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      handle_basic_market_search: {
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
    };
    Enums: {
      order_side: "BUY" | "SELL";
      order_status: "PENDING" | "APPROVED" | "CONFIRMED";
      order_type: "FOK" | "GTC" | "GTD";
      trade_side: "BUY" | "SELL";
      trade_status: "MATCHED" | "MINED" | "CONFIRMED" | "RETRYING" | "FAILED";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
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
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

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
  : never;
