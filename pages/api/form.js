export default function handler(req, res) {
    const body = req.body;

    console.log(body);

    if(!body.firstName || !body.email || !body.message) {
        return res.status(400).json({data: "first name, email, and message fields are required!"});
    }

    return res.status(200).json({data: "form submitted successfully"});
}