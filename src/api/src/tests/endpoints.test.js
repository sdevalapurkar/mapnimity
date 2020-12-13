const request = require('supertest');
const index = require('../index');

describe('Test Endpoint', () => {
    it('Should create a new post', async () => {
        const res = await request(index).get("/api/test").send({});
        expect(res.statusCode).toEqual(200);
    });
});

describe('LatLng Endpoints', () => {
    it('Should create a POST request for Geocode conversions', async () => {
        const res = await request(index).post("/api/latlng").send({
            "locations": ["1669 Blair Avenue, Victoria, BC"]
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body[0].lat).toEqual(48.472705);
        expect(res.body[0].lng).toEqual(-123.3296144);
    });
});

describe('Locations Endpoints', () => {
    it('Should create a POST request for nearby locations', async () => {
        const res = await request(index).post("/api/locations").send({
            "locations": ["267A Tolcross Avenue, Victoria, BC", "1669 Blair Avenue, Victoria, BC", "3829 Midgard Place, Victoria, BC"]
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body[0].name).toEqual("Kuma Noodle Japan");
    });
});
