import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import userSettingsActions from '../app.actions';

import './avatareditor.component.css';

class AvatarEditor extends Component {
    constructor(props) {
        super(props);

        this.api = props.d2.Api.getApi();
        this.userId = props.currentUser.id;

        this.state = {
            avatarSrc: props.currentUser.avatar
                ? this.parseAvatarSrc(props.currentUser.avatar.id)
                : null,
            loading: false,
        };
        this.inputRef = null;
    }

    getInputRef = () => this.inputRef;
    setInputRef = node => this.inputRef = node;

    parseAvatarSrc(avatarId) {
        return `${this.api.baseUrl}/fileResources/${avatarId}/data`;
    }

    onFileSelect = async event => {
        const { d2, onChange } = this.props;
        // Setup form data for image file
        const file = event.target.files[0];

        // Cancel was pressed, no file provided
        if (!file) {
            return;
        }

        this.setState({ loading: true });

        const formData = new FormData();
        formData.append('file', file);
        formData.append('domain', 'USER_AVATAR');

        // Send image to server and save image id as avatar
        try {
            const postResponse = await this.api.post('fileResources', formData);
            const imageId = postResponse.response.fileResource.id;
            onChange({ target: { value: { id: imageId } } });
            this.setState({
                loading: false,
                avatarSrc: this.parseAvatarSrc(imageId),
            });
        } catch (error) {
            userSettingsActions.showSnackbarMessage({
                message: d2.i18n.getTranslation('avatar_upload_error'),
                status: 'error',
            });
            console.error(
                'POST request to fileResources endpoint failed: ',
                error
            );
        }
    };

    onRemoveIcon = () => {
        this.props.onChange({ target: { value: null } });
        // Clear input here to ensure that a re-upload of a previously used file is not ignored
        const input = this.getInputRef();
        input.value = null;
        this.setState({ avatarSrc: null });
    };

    renderAvatar() {
        return (
            <div className="avatar-editor__preview">
                <img
                    src={this.state.avatarSrc}
                    className="avatar-editor__image"
                    alt={this.props.d2.i18n.getTranslation('avatar')}
                />
            </div>
        );
    }

    renderPlaceholder() {
        const { d2 } = this.props;
        return (
            <div className="avatar-editor__not-available">
                <div>
                    {d2.i18n.getTranslation('no_avatar_available')}
                </div>
            </div>
        );
    }

    render() {
        const { d2 } = this.props;
        const { loading, avatarSrc } = this.state;

        return (
            <div className="avatar-editor">
                <p className="avatar-editor__label">
                    {d2.i18n.getTranslation('avatar')}
                </p>
                <div className="avatar-editor__preview-wrap">
                    {loading ? (
                        <CircularProgress />
                    ) : avatarSrc ? (
                        this.renderAvatar()
                    ) : (
                        this.renderPlaceholder()
                    )}
                </div>
                <div className="avatar-editor__buttonstrip">
                    <FlatButton
                        containerElement="label"
                        icon={<FileUpload />}
                        label={d2.i18n.getTranslation('select_avatar')}
                        primary
                    >
                        <input
                            onChange={this.onFileSelect}
                            style={{ display: 'none' }}
                            type="file"
                            accept="image/*"
                            ref={this.setInputRef}
                        />
                    </FlatButton>
                    {avatarSrc && (
                        <FlatButton
                            icon={<ActionDelete />}
                            label={d2.i18n.getTranslation('remove_avatar')}
                            onClick={this.onRemoveIcon}
                        />
                    )}
                </div>
            </div>
        );
    }
}

AvatarEditor.propTypes = {
    d2: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default AvatarEditor;
