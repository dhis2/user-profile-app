import CircularProgress from 'material-ui/CircularProgress'
import FlatButton from 'material-ui/FlatButton'
import ActionDelete from 'material-ui/svg-icons/action/delete.js'
import FileUpload from 'material-ui/svg-icons/file/file-upload.js'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import userSettingsActions from '../app.actions.jsx'
import i18n from '../locales/index.js'
import './avatareditor.component.css'
import optionValueStore from '../optionValue.store.js'

const MAX_PROFILE_PICTURE_SIZE_IN_MB = 2 // maximum allowed file size for an avatar (2MB)

class AvatarEditor extends Component {
    constructor(props) {
        super(props)

        // This system setting does not exist currently, but leaving it here in case 1MB is not enough in some contexts
        this.maxPhotoSize =
            optionValueStore?.state.systemDefault?.keyMaxAvatarSizeInMB ??
            MAX_PROFILE_PICTURE_SIZE_IN_MB

        this.api = props.d2.Api.getApi()
        this.userId = props.currentUser.id

        this.state = {
            avatarSrc: props.currentUser.avatar
                ? this.parseAvatarSrc(props.currentUser.avatar.id)
                : null,
            loading: false,
        }
        this.inputRef = null
    }

    getInputRef = () => this.inputRef
    setInputRef = (node) => (this.inputRef = node)

    parseAvatarSrc(avatarId) {
        return `${this.api.baseUrl}/fileResources/${avatarId}/data`
    }

    onFileSelect = async (event) => {
        const { onChange } = this.props
        // Setup form data for image file
        const file = event.target.files[0]

        // reject files bigger than the maximum allowed size
        const maxSize = this.maxPhotoSize * 1000 * 1024 // maximum size in bytes
        if (file?.size > maxSize) {
            userSettingsActions.showSnackbarMessage({
                message: i18n.t(
                    `Please choose a profile avatar less than {{- maxSize}}MB in size.`,
                    {
                        maxSize: this.maxPhotoSize,
                    }
                ),
                status: 'error',
                permanent: true,
            })

            return
        }

        // Cancel was pressed, no file provided
        if (!file) {
            return
        }

        this.setState({ loading: true })

        const formData = new FormData()
        formData.append('file', file)
        formData.append('domain', 'USER_AVATAR')

        // Send image to server and save image id as avatar
        try {
            const postResponse = await this.api.post('fileResources', formData)
            const imageId = postResponse.response.fileResource.id
            onChange({ target: { value: { id: imageId } } })
            this.setState({
                loading: false,
                avatarSrc: this.parseAvatarSrc(imageId),
            })
        } catch (error) {
            const serverMessage =
                error?.message ||
                i18n.t('Failed to upload profile picture')
            userSettingsActions.showSnackbarMessage({
                message: serverMessage,
                status: 'error',
                permanent: true,
            })

            this.setState({ loading: false })
        }
    }

    onRemoveIcon = () => {
        this.props.onChange({ target: { value: null } })
        // Clear input here to ensure that a re-upload of a previously used file is not ignored
        const input = this.getInputRef()
        input.value = null
        this.setState({ avatarSrc: null })
    }

    renderAvatar() {
        return (
            <div className="avatar-editor__preview">
                <img
                    src={this.state.avatarSrc}
                    className="avatar-editor__image"
                    alt={i18n.t('Profile picture')}
                />
            </div>
        )
    }

    renderPlaceholder() {
        return (
            <div className="avatar-editor__not-available">
                <div>{i18n.t('No profile picture available')}</div>
            </div>
        )
    }

    render() {
        const { loading, avatarSrc } = this.state

        return (
            <div className="avatar-editor">
                <p className="avatar-editor__label">
                    {i18n.t('Profile picture')}
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
                        label={i18n.t('Select profile picture')}
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
                            label={i18n.t('Remove profile picture')}
                            onClick={this.onRemoveIcon}
                        />
                    )}
                </div>
            </div>
        )
    }
}

AvatarEditor.propTypes = {
    currentUser: PropTypes.object.isRequired,
    d2: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default AvatarEditor
