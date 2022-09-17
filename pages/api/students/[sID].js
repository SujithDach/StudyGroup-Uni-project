import connectMongo from "../../../util/mongodb";
import Student from "../../../models/Student";

export default async function handler(req, res) {
  try {
    const { sID } = req.query;
    console.log(req.query)

    await connectMongo();
    console.log(`${req.url} accessed`);
    
    const result = await Student.find({ studentID: sID });

    res.json({ result });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
