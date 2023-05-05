const express = require('express');
const Content = require('../../models/content');

const getContents = async (req, res, next) => {
    try {

        let contents = await Content.find({});

        if (contents.length > 0) {
            return res.status(200).json({
                'message': 'content fetched successfully',
                'data': contents
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No contents found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const getContentsById = async (req, res, next) => {
    try {
        let c = await Content.findById(req.params.id);
        if (Content) {
            return res.status(200).json({
                'message': `content with id ${req.params.id} fetched successfully`,
                'data': Content
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No Content found in the system'
        });

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const createContent = async (req, res, next) => {
    try {

        const {
            title,
            video,
        } = req.body;

        if (title === undefined || title === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'title is required',
                'field': 'title'
            });
        }

        if (video === undefined || video === '') {
                
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'mobile is required',
                'field': 'mobile'
            });
        }
       

        let isVideoExists = await Content.findOne({
            "video": video
        });

        if (isVideoExists) {
            return res.status(409).json({
                'code': 'ENTITY_ALREAY_EXISTS',
                'description': 'video already exists',
                'field': 'video'
            });
        }

        const temp = {
            title:title,
            video: video,
        }

        let newContent = await Content.create(temp);

        if (newContent) {
            return res.status(201).json({
                'message': 'content created successfully',
                'data': newContent
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

const updateContent = async (req, res, next) => {
    try {


        const contentId = req.params.id;

        const {
            title,
            video,
        } = req.body;

        if (title === undefined || title === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'title is required',
                'field': 'title'
            });
        }

        if (video === undefined || video === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'video is required',
                'field': 'video'
            });
        }

      
        let isContentExists = await Content.findById(ContentId);

        if (!isContentExists) {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No content found in the system'
            });
        }

        const temp = {
            title: title,
            video: video,
        }

        let updateContent= await Content.findByIdAndUpdate(contentId, temp, {
            new: true
        });

        if (updateContent) {
            return res.status(200).json({
                'message': 'content updated successfully',
                'data': updateContent
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

const deleteContent = async (req, res, next) => {
    try {
        let Content = await Content.findByIdAndRemove(req.params.id);
        if (Content) {
            return res.status(204).json({
                'message': `content with id ${req.params.id} deleted successfully`
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No content found in the system'
        });

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

module.exports = {
    getContents: getContents,
    getContentsById: getContentsById,
    createContent: createContent,
    updateContent: updateContent,
    deleteContent: deleteContent
}
