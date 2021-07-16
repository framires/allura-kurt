import { SiteClient } from "datocms-client";

export default async function recebedorDeRequest(req, resp) {
  const TOKEN = "031281ee7af3598777bf1c2bb6d19d";
  const client = new SiteClient(TOKEN);

  if (req.method === "POST") {
    const registroCriado = await client.items.create({
      itemType: "968800",
      title: req.body.name,
      image: req.body.image,
      creator_slug: "framires",
    });
    resp.json(registroCriado);
    return;
  }

  resp.status(404).json({
      message : "Get nao implementando"
  })
}
