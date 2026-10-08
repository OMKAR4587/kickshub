const API_URL = "http://localhost:5000/api"

export async function getProducts() {
  const response = await fetch(`${API_URL}/products`)

  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }

  return response.json()
}

export async function getProduct(id: string) {
  const response = await fetch(`${API_URL}/products/${id}`)

  if (!response.ok) {
    throw new Error("Failed to fetch product")
  }

  return response.json()
}

export async function registerUser(data: {
  name: string
  email: string
  password: string
}) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return response.json()
}

export async function loginUser(data: {
  email: string
  password: string
}) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return response.json()
}

export async function getCurrentUser(token: string) {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.json()
}

export async function getCart(token: string) {
  const response = await fetch("http://localhost:5000/api/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

export async function addCartItem(
  token: string,
  productId: string,
  size: number,
  quantity: number,
) {
  const response = await fetch("http://localhost:5000/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId,
      size,
      quantity,
    }),
  });

  return response.json();
}

export async function updateCartItem(
  token: string,
  itemId: string,
  quantity: number,
) {
  const response = await fetch(
    `http://localhost:5000/api/cart/${itemId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quantity,
      }),
    },
  );

  return response.json();
}

export async function removeCartItem(
  token: string,
  itemId: string,
) {
  const response = await fetch(
    `http://localhost:5000/api/cart/${itemId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.json();
}

export async function clearCartApi(token: string) {
  const response = await fetch("http://localhost:5000/api/cart", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

export async function getWishlist(token: string) {
  const response = await fetch(
    "http://localhost:5000/api/wishlist",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.json();
}

export async function addWishlistItem(
  token: string,
  productId: string,
) {
  const response = await fetch(
    "http://localhost:5000/api/wishlist",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
      }),
    },
  );

  return response.json();
}

export async function removeWishlistItem(
  token: string,
  productId: string,
) {
  const response = await fetch(
    `http://localhost:5000/api/wishlist/${productId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.json();
}

export async function createOrder(token: string) {
  const response = await fetch(
    "http://localhost:5000/api/orders",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.json();
}

export async function getOrders(token: string) {
  const response = await fetch(
    "http://localhost:5000/api/orders",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.json();
}