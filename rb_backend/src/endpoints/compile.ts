export const compile = (app: any) => {
  app.post("/compile", async (req: any, res: any, next: any) => {
    try {
      console.log(req.body);
      res.json([]);
    } catch (error) {
      console.log(console.error());
      res.json({ status: "error", message: console.error() });
      next(error);
    }
  });
};
