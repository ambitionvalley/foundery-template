export async function POST(_request: Request) {
  return new Response("Stripe webhooks not wired", { status: 501 });
}
