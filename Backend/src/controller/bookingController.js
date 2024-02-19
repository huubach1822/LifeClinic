import bookingService from '../service/bookingService';

const updateBooking = async (req, res) => {

    let result = await bookingService.updateBooking(req.body);
    return res.status(200).json(result)

}

module.exports = {
    updateBooking: updateBooking
}