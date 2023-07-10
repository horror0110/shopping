import React , {useState ,useEffect , useRef} from 'react'
const thousandify = require('thousandify');
import Link from 'next/link';

const Vitamin = () => {

    const [products, setProducts] = useState([]);
    const productsContainerRef = useRef(null);
  
    useEffect(() => {
      fetch(`api/categories/64ab92b4fdae604aa01fb619/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }, []);
  
    const handleNextClick = () => {
      const container = productsContainerRef.current;
      container.scrollBy({ left: container.offsetWidth, behavior: "smooth" });
    };
  return (
    <div>
        <div className="container mx-auto px-4 py-8">
  <h1 className="text-2xl font-bold mb-4">Уураг , Витамин</h1>
  <div className="overflow-x-auto" ref={productsContainerRef}>
    <div className="flex space-x-4">
      {products.map((product, index) => (
        <div
          key={product._id}
          className="border border-gray-300 rounded p-4 flex flex-col justify-between w-64"
        >
          <div>
            <img
              src={product.photo[0]}
              alt={product.name}
              className="h-40 object-cover mb-4"
            />
            <h2 className="text-lg font-bold mb-2">{product.name}</h2>
            <p className="text-sm text-gray-500 mb-2">
              {product.description}
            </p>
            <p className="text-sm text-gray-500 mb-2">Үнэ: <strong className='text-black'>{thousandify(product.price)}₮</strong></p>
            <p className="text-sm text-gray-500 mb-2 ">
              Бэлэн байгаа: <strong className='text-black'>{product.balance}</strong>
            </p>
           
          </div>
          <div className="flex flex-col ">
                    <Link
                      href="/"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-4 w-[150px]"
                    >
                      Сагсанд хийх
                    </Link>

                    <Link
                      href={product._id}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-4 w-[150px]"
                    >
                      Дэлгэрэнгүй
                    </Link>
                  </div>
        </div>
      ))}
    </div>
  </div>
</div>
<button
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
  onClick={handleNextClick}
>
  Next
</button>
    </div>
  )
}

export default Vitamin