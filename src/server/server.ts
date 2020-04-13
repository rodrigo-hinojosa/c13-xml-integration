import app from '../app/app';
try {
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`'Express server listening on port ${port}!`);
    });
} catch (error) {
    console.error(error);
}