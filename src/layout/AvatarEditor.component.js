import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import ActionDelete from 'material-ui/svg-icons/action/delete';
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
            loading: false
        };
    }

    parseAvatarSrc(avatarId) {
        return `${this.api.baseUrl}/fileResources/${avatarId}/data`;
    }

    onFileSelect = async event => {
        this.setState({ loading: true });
        // Setup form data for image file
        const formData = new FormData();
        const file = event.target.files[0];
        formData.append("file", file);
        formData.append("domain", "USER_AVATAR");

        // Send image to server and save image id as avatar
        try {
            const postImageResponse = await this.api.post(
                'fileResources',
                formData
            );
            const imageId = postImageResponse.response.fileResource.id;
            this.props.onChange({ target: { value: imageId } });
            console.log(postImageResponse);
            this.setState({
                loading: false,
                avatarSrc: this.parseAvatarSrc(imageId)
            });
        } catch (error) {
            console.log(
                'POST request to fileResources endpoint failed: ',
                error
            );
        }
    };

    onRemoveIcon = () => {
        this.props.onChange({ target: { value: null } });
        this.setState({ avatarSrc: null });
    };

    renderAvatar() {
        return (
            <div className="avatar-editor__preview">
                <img
                    src={this.state.avatarSrc}
                    className="avatar-editor__image"
                />
            </div>
        );
    }

    renderPlaceholder() {
        const { d2 } = this.props;
        return (
            <div className="avatar-editor__not-available">
                <div>
                    {d2.i18n.getTranslation('no_profile_picture_available')}
                </div>
            </div>
        );
    }

    render() {
        const { d2 } = this.props;
        const { loading, avatarSrc } = this.state;
        console.log(`Avatar: ${avatarSrc} | loading: ${loading}`);

        return (
            <div className="avatar-editor">
                <p className="avatar-editor__label">
                    {d2.i18n.getTranslation('profile_picture')}
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
                        label={d2.i18n.getTranslation('select_profile_picture')}
                        primary
                    >
                        <input
                            onChange={this.onFileSelect}
                            style={{ display: 'none' }}
                            type="file"
                        />
                    </FlatButton>
                    <FlatButton
                        icon={<ActionDelete />}
                        label={d2.i18n.getTranslation('remove_profile_picture')}
                        onClick={this.onRemoveIcon}
                    />
                </div>
            </div>
        );
    }
}

AvatarEditor.propTypes = {};

export default AvatarEditor;
