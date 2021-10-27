import React from 'react'

export default function Item(props) {
    const { item } = props;
    return (
        <li>
            <img src={item.productimage} alt="" />
            <div className="product-title text-ellipses">
                {item.productname}
            </div>
            <div className="price">
                <span className="price-after-discount">Rs. {item.mrpprice}</span>
                <span className="price-before-discount">{item.pricewithoutdiscount}</span>
            </div>
        </li>
    )
}
