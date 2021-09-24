import { Router, request, response } from 'express';
import ProductosPersistencia from '../productos';
import faker from 'faker';


const router = Router();
const miProducto = new ProductosPersistencia();

router.get('/vista', (req, res) => {
	miProducto.leer().then((data) => {
		const datosDinamicos = { 
			productos: data
		}
		console.log(datosDinamicos);
		res.render('main', datosDinamicos);
	})
}); 

router.get('/vista-test', (req, res) => {
	const productosFaker = []
	let { noProductos } = req.query

	if(!noProductos){
		noProductos = "10"
	}

	for(let i =0; i<Number(noProductos); i++){
		productosFaker.push({
				nombre: faker.commerce.productName(),
				precio: faker.commerce.price(),
				url: faker.image.imageUrl()
		})
	}

	const productosDinamicos = {
		productos: productosFaker
	}
	res.render('main', productosDinamicos);

});   

export default router;