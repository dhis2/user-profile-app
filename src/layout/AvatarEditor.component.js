import CircularProgress from 'material-ui/CircularProgress'
import FlatButton from 'material-ui/FlatButton'
import ActionDelete from 'material-ui/svg-icons/action/delete.js'
import FileUpload from 'material-ui/svg-icons/file/file-upload.js'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import userSettingsActions from '../app.actions.js'
import i18n from '../locales/index.js'
import './avatareditor.component.css'

class AvatarEditor extends Component {
    constructor(props) {
        super(props)

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
            userSettingsActions.showSnackbarMessage({
                message: i18n.t('Failed to upload profile picture'),
                status: 'error',
            })
            console.error(
                'POST request to fileResources endpoint failed: ',
                error
            )
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
