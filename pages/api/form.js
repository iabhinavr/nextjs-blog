export default function handler(req, res) {
    const body = req.body;

    console.log(body);

    return res.status(200).json({data: "form submitted successfully"});
}