const express = require('express');
const SMS = require('../../models/sms');

const getsms = async (req, res, next) => {
    try {

        let sms = await SMS.find({});

        if (sms.length > 0) {
            return res.status(200).json({
                'message': 'image fetched successfully',
                'data': sms
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


const createSms = async (req, res, next) => {
    try {

        const {
            content,
            mobile,
            userId
        } = req.body;

        if (content === undefined || content === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'content is required',
                'field': 'content'
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


        let isUserExists = await SMS.findOne({
            "userId": userId
        });

        if (isUserExists) {
            return res.status(409).json({
                'code': 'ENTITY_ALREAY_EXISTS',
                'description': 'userId already exists',
                'field': 'userId'
            });
        }

        const temp = {
            content: content,
            mobile:mobile,
            userId:userId,
        }

        let newsms= await SMS.create(temp);

        if (newsms) {
            return res.status(201).json({
                'message': 'sms added successfully',
                'data': newsms
            });
        } else {
            throw new Error('something went worng');
        }
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}
module.exports = {
    getsms: getsms,
    createSms: createSms,
}
