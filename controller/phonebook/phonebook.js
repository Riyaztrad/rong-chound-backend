const express = require('express');
const PhoneBook = require('../../models/phonebook');

const getPhoneBook = async (req, res, next) => {
    try {

        let phonebook = await PhoneBook.find({});

        if (users.length > 0) {
            return res.status(200).json({
                'message': 'phonebook fetched successfully',
                'data': phonebook
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No phonebook found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const getByUserId = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id);
        if (user) {
            return res.status(200).json({
                'message': `user with id ${req.params.id} fetched successfully`,
                'data': user
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No phonebook found in the system'
        });

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const createPhoneBook = async (req, res, next) => {
    try {
        console.log("phonebook")

        const {
            name,
            mobile,
            userId
        } = req.body;

        if (name === undefined || name === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'name is required',
                'field': 'name'
            });
        }

        if (mobile === undefined || mobile === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'mobile is required',
                'field': 'mobile'
            });
        }
        if (userId === undefined || userId === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'userId is required',
                'field': 'userId'
            });
        }


       

        const temp = {
            name: name,
            mobile: mobile,
            userId:userId,
        }

        let newphonebook = await PhoneBook.create(temp);

        if (newphonebook) {
            return res.status(201).json({
                'message': 'phonebook created successfully',
                'data': newphonebook
            });
        } else {
            throw new Error('something went worng');
        }
    } catch (error) {
        console.log("error",error)
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}
module.exports = {
    getPhoneBook: getPhoneBook,
    getByUserId: getByUserId,
    createPhoneBook:createPhoneBook,
}
