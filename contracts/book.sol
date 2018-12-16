pragma solidity ^0.4.25;

contract book {
    struct Book {
        address writer;
        string secret;
    }

    mapping(string => Book) bookData;
    address storeAddress = 0x24597ADe1c56C04EaC1D02D1389f3bCA933e91c2;
    address writerAddress;
    uint256 storeFee;
    uint256 writerFee;

    function getSecret(string hash) public view returns (string) {
        return bookData[hash].secret;
    }

    function addBook(string hash, address writer, string secret) public {
        bookData[hash] = Book({writer: writer, secret: secret});
    }

    function removeBook(string hash) public {
        delete bookData[hash];
    }

    function buyBook(string hash) public payable {
        storeFee = msg.value * 2 / 10;
        writerFee = msg.value * 8 / 10;
        writerAddress = bookData[hash].writer;
        storeAddress.transfer(storeFee);
        writerAddress.transfer(writerFee);
    }
}
