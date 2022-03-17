// Making sure messages are added with the correct information (authorId and conversationId)
// Documentation should be updated, unless it's on purpose

module.exports = (req, res, next) => {
  if (/messages/.test(req.url) && req.method === 'POST') {
    if (!req.body.conversationId || !req.body.authorId) {
      return res.status(400).json({
        messge: 'Missing authorId and conversationId in the request body',
      });
    }
  }
  next();
};
