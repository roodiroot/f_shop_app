export type ApiResult<T> = {
  ok: boolean;
  data?: T;
  error?: string;
};

export type CheckoutPayload = {
  customer: {
    phone: string;
    email: string;
    deliveryAddress?: string;
    comment?: string;
  };
  paymentMethod: string;
  items: Array<{
    variantId: string;
    quantity: number;
  }>;
};

export type CheckoutRes = {
  orderId: string;
  totalPrice: number;
  confirmationUrl: string;
};

const API_URL = process.env.EXPO_PUBLIC_API_URL || "";
export const checkout = async (
  payload: CheckoutPayload,
  token?: string | null
): Promise<ApiResult<CheckoutRes>> => {
  try {
    const res = await fetch(`${API_URL}/api/orders/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        ok: false,
        error: errorData?.error || "Checkout failed",
      };
    }
    return {
      ok: true,
      data: await res.json(),
    };
  } catch (error) {
    console.error("Checkout error:", error);
    return {
      ok: false,
      error: (error as Error)?.message || "Checkout failed",
    };
  }
};

export const payApi = async (id: string): Promise<ApiResult<CheckoutRes>> => {
  try {
    const res = await fetch(`${API_URL}/api/payments/pay/${id}`, {
      method: "POST",
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        ok: false,
        error: errorData?.error || "pay failed",
      };
    }
    return {
      ok: true,
      data: await res.json(),
    };
  } catch (error) {
    console.error("Checkout error:", error);
    return {
      ok: false,
      error: (error as Error)?.message || "Checkout failed",
    };
  }
};
