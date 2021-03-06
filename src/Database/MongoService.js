'use strict';

/**
 * Mongo Service class, handles all interactions with MongoDB.
 *
 * @author KhaaZ
 *
 * @class MongoService
 */
class MongoService {
    constructor(axon) {
        this._axon = axon;
    }

    get axon() {
        return this._axon;
    }

    init(axonOptions) {
        this.AxonSchema = axonOptions.axonSchema || require('./Models/AxonSchema').default;
        this.GuildSchema = axonOptions.guildSchema || require('./Models/GuildSchema').default;

        this.axon.schemas.set('axonSchema', this.AxonSchema);
        this.axon.schemas.set('guildSchema', this.GuildSchema);
    }

    /**
     * Retrieves the Axon schema from the DB.
     *
     * @returns {Promise<Object|null>} AxonSchema or null
     * @memberof MongoService
     */
    fetchAxon() {
        return this.AxonSchema.findOne({
            ID : '1',
        });
    }

    /**
     * Retreives the Guild Schema for the specified guild.
     * WARNING: LEAN (faster but no mongo methods)
     *
     * @param {String} gID - guild ID
     * @returns {Promise<Object|null>} GuildSchema or null
     * @memberof MongoService
     */
    fetchGuild(gID) {
        return this.GuildSchema.findOne({
            guildID : gID,
        }).lean();
    }

    /**
     * Retreives the Guild Schema for the specified guild.
     * NOT LEAN
     *
     * @param {String} gID - guild ID
     * @returns {Promise<Object|null>} GuildSchema or null
     * @memberof MongoService
     */
    fetchGuildSchema(gID) {
        return this.GuildSchema.findOne({
            guildID : gID,
        });
    }

    /**
     * Initialises a default schema for Axon.
     *
     * @returns {Promise<Object>} Newly created Axon Schema
     * @memberof MongoService
     */
    initAxon() {
        return this.AxonSchema.findOneAndUpdate({
            ID : '1',
        },
        {
            ID: '1',
        },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        });
    }

    /**
     * Initialises a default schema for the specified guild.
     *
     * @param {String} gID - guild ID
     * @returns {Promise<Object>} Guild Schema Object newly created
     * @memberof MongoService
     */
    initGuild(gID) {
        return this.GuildSchema.findOneAndUpdate({
            guildID : gID,
        },
        {
            guildID : gID,
        },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        });
    }

    /**
     * Updates the blacklisted users.
     *
     * @param {Array<String>} blacklistedUsers - Array of blacklistedUsers
     * @returns {Promise} Updated AxonSchema
     * @memberof MongoService
     */
    updateBlacklistUser(blacklistedUsers) {
        return this.AxonSchema.findOneAndUpdate({
            ID : '1',
        },
        {
            $set: {
                bannedUsers: blacklistedUsers,
            },
        },
        {
            new: true,
            upsert: true,
        });
    }

    /**
     * Update the blacklisted guilds
     *
     * @param {Array<String>} blacklistedGuilds - Array of blacklistedUsers
     * @returns {Promise} Updated AxonSchema
     * @memberof MongoService
     */
    updateBlacklistGuild(blacklistedGuilds) {
        return this.AxonSchema.findOneAndUpdate({
            ID : '1',
        },
        {
            $set: {
                bannedUsers: blacklistedGuilds,
            },
        },
        {
            new: true,
            upsert: true,
        });
    }

    /**
     * Updates the prefix array for the specified guild.
     *
     * @param {String} gID - guild ID
     * @param {Array<String>} prefixArr - Array of prefixes
     * @returns {Promise} Updated GuildSchema
     * @memberof MongoService
     */
    updateGuildPrefix(gID, prefixArr) {
        return this.GuildSchema.findOneAndUpdate({
            guildID : gID,
        },
        {
            $set: {
                prefix: prefixArr,
            },
        },
        {
            new: true,
            upsert: true,
        });
    }

    /**
     * Updates the modules array for the specified guild.
     *
     * @param {Array<String>} modulesArr - Array of modules label
     * @returns {Promise} Updated GuildSchema
     * @memberof MongoService
     */
    updateModule(gID, modulesArr) {
        return this.GuildSchema.findOneAndUpdate({
            guildID : gID,
        },
        {
            $set: {
                modules: modulesArr,
            },
        },
        {
            new: true,
            upsert: true,
        });
    }

    /**
     * Updates the commands array for the specified guild.
     *
     * @param {Array<String>} commandsArr - Array of commands label
     * @returns {Promise} Updated GuildSchema
     * @memberof MongoService
     */
    updateCommand(gID, commandsArr) {
        return this.GuildSchema.findOneAndUpdate({
            guildID : gID,
        },
        {
            $set: {
                commands: commandsArr,
            },
        },
        {
            new: true,
            upsert: true,
        });
    }

    /**
     * Updates the events array for the specified guild.
     *
     * @param {Array<String>} eventsArr - Array of events label
     * @returns {Promise} Updated GuildSchema
     * @memberof MongoService
     */
    updateEvent(gID, eventsArr) {
        return this.GuildSchema.findOneAndUpdate({
            guildID : gID,
        },
        {
            $set: {
                events: eventsArr,
            },
        },
        {
            new: true,
            upsert: true,
        });
    }

    /**
     * Updates the given schema in the DB with a new schema.
     *
     * @param {Object} schema - the schema object to update
     * @returns {Promise} Updated Schema from the DB
     * @memberof MongoService
     */
    saveSchema(schema) {
        return schema.save();
    }

    /**
     * Saves the guild schema.
     *
     * @param {String} gID - Guid id
     * @param {Object} schema - Guild Schema to save
     * @returns {Promise} Updated Guild Schema
     * @memberof MongoService
     */
    saveGuildSchema(gID, schema) {
        return this.GuildSchema.findOneAndUpdate({
            guildID : gID,
        },
        schema,
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        });
    }
}

export default MongoService;
